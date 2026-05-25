/**
 * Authentication Routes
 * Handles login, logout, and user management
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { generateToken, authenticateToken, requireRole } = require('../middleware/auth');

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Username and password are required.',
      code: 'MISSING_CREDENTIALS'
    });
  }

  const db = req.app.locals.sqliteDb;
  const supabase = req.app.locals.supabase;
  const dbMode = req.app.locals.dbMode;

  console.log(`[AUTH] Login attempt: ${username} (DB Mode: ${dbMode})`);

  try {
    let user = null;

    // Fetch user from database
    if (dbMode === 'supabase' && supabase) {
      console.log(`[AUTH] Querying Supabase for user: ${username.toLowerCase()}`);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username.toLowerCase())
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log(`[AUTH] User NOT found in Supabase: ${username.toLowerCase()}`);
        } else {
          console.error('[AUTH] Supabase user fetch error:', error);
        }
      } else {
        console.log(`[AUTH] User found in Supabase: ${username.toLowerCase()} (Role: ${data.role})`);
      }
      user = data;
    } else if (db) {
      console.log(`[AUTH] Querying SQLite for user: ${username.toLowerCase()}`);
      user = await new Promise((resolve, reject) => {
        db.get(
          'SELECT * FROM users WHERE username = ?',
          [username.toLowerCase()],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          }
        );
      });
      if (!user) {
        console.log(`[AUTH] User NOT found in SQLite: ${username.toLowerCase()}`);
      } else {
        console.log(`[AUTH] User found in SQLite: ${username.toLowerCase()} (Role: ${user.role})`);
      }
    }

    if (!user) {
      console.log(`[AUTH] Login failed: User not found`);
      return res.status(401).json({ 
        error: 'Invalid credentials.',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check if user is active
    if (user.status !== 'active') {
      console.log(`[AUTH] Login failed: Account inactive`);
      return res.status(403).json({ 
        error: 'Account is inactive. Contact administrator.',
        code: 'ACCOUNT_INACTIVE'
      });
    }

    // Verify password
    console.log(`[AUTH] Comparing password for user: ${username}`);
    const passwordHash = user.password_hash || user.password; // Support both names
    if (!passwordHash) {
      throw new Error('User record missing password hash field.');
    }
    
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    
    if (!isValidPassword) {
      console.log(`[AUTH] Login failed: Password mismatch`);
      return res.status(401).json({ 
        error: 'Invalid credentials.',
        code: 'INVALID_CREDENTIALS'
      });
    }

    console.log(`[AUTH] Login SUCCESS: ${username}`);

    // Update last login
    const now = new Date().toISOString();
    if (dbMode === 'supabase' && supabase) {
      await supabase.from('users').update({ last_login: now }).eq('id', user.id);
    } else if (db) {
      db.run('UPDATE users SET last_login = ? WHERE id = ?', [now, user.id]);
    }

    // Generate token
    const token = generateToken(user);

    // Return user info and token
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        tenantId: user.tenant_id,
        displayName: user.display_name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login.',
      code: 'LOGIN_ERROR'
    });
  }
});

/**
 * POST /api/auth/logout
 * Client-side logout (token invalidation would require token blacklist in production)
 */
router.post('/logout', authenticateToken, (req, res) => {
  // In production, you might want to add token to a blacklist
  res.json({ success: true, message: 'Logged out successfully.' });
});

/**
 * GET /api/auth/me
 * Get current authenticated user info
 */
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      userId: req.user.userId,
      username: req.user.username,
      role: req.user.role,
      tenantId: req.user.tenantId
    }
  });
});

/**
 * POST /api/auth/change-password
 * Change user password
 */
router.post('/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ 
      error: 'Current password and new password are required.',
      code: 'MISSING_PASSWORDS'
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ 
      error: 'New password must be at least 8 characters.',
      code: 'PASSWORD_TOO_SHORT'
    });
  }

  const db = req.app.locals.sqliteDb;
  const supabase = req.app.locals.supabase;
  const dbMode = req.app.locals.dbMode;

  try {
    // Get current user with password
    let user = null;
    if (dbMode === 'supabase' && supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('password_hash')
        .eq('id', req.user.userId)
        .single();
      user = data;
    } else if (db) {
      user = await new Promise((resolve, reject) => {
        db.get(
          'SELECT password_hash FROM users WHERE id = ?',
          [req.user.userId],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          }
        );
      });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ 
        error: 'Current password is incorrect.',
        code: 'INVALID_CURRENT_PASSWORD'
      });
    }

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 12);

    // Update password
    if (dbMode === 'supabase' && supabase) {
      await supabase.from('users').update({ password_hash: newHash }).eq('id', req.user.userId);
    } else if (db) {
      db.run('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, req.user.userId]);
    }

    res.json({ success: true, message: 'Password changed successfully.' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      error: 'Failed to change password.',
      code: 'PASSWORD_CHANGE_ERROR'
    });
  }
});

/**
 * POST /api/auth/register
 * Create new user (super-admin only)
 */
router.post('/register', authenticateToken, requireRole('super-admin'), async (req, res) => {
  const { username, password, role, tenantId, displayName } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ 
      error: 'Username, password, and role are required.',
      code: 'MISSING_FIELDS'
    });
  }

  // Validate role
  const validRoles = ['super-admin', 'tenant-super', 'tenant-normal'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ 
      error: 'Invalid role. Must be: super-admin, tenant-super, or tenant-normal',
      code: 'INVALID_ROLE'
    });
  }

  // Tenant roles require tenantId
  if ((role === 'tenant-super' || role === 'tenant-normal') && !tenantId) {
    return res.status(400).json({ 
      error: 'Tenant ID is required for tenant roles.',
      code: 'MISSING_TENANT'
    });
  }

  const db = req.app.locals.sqliteDb;
  const supabase = req.app.locals.supabase;
  const dbMode = req.app.locals.dbMode;

  try {
    // Check if username exists
    let existingUser = null;
    if (dbMode === 'supabase' && supabase) {
      const { data } = await supabase.from('users').select('id').eq('username', username.toLowerCase()).single();
      existingUser = data;
    } else if (db) {
      existingUser = await new Promise((resolve, reject) => {
        db.get('SELECT id FROM users WHERE username = ?', [username.toLowerCase()], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    }

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Username already exists.',
        code: 'USERNAME_EXISTS'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const newUser = {
      id: `user-${Date.now()}`,
      username: username.toLowerCase(),
      password_hash: passwordHash,
      role: role,
      tenant_id: tenantId || null,
      display_name: displayName || username,
      status: 'active',
      created_at: new Date().toISOString()
    };

    if (dbMode === 'supabase' && supabase) {
      const { error } = await supabase.from('users').insert([newUser]);
      if (error) throw error;
    } else if (db) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (id, username, password_hash, role, tenant_id, display_name, status, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [newUser.id, newUser.username, newUser.password_hash, newUser.role, 
           newUser.tenant_id, newUser.display_name, newUser.status, newUser.created_at],
          function(err) {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        tenantId: newUser.tenant_id,
        displayName: newUser.display_name
      }
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ 
      error: 'Failed to create user.',
      code: 'REGISTRATION_ERROR'
    });
  }
});

/**
 * GET /api/auth/users
 * List all users (super-admin only)
 */
router.get('/users', authenticateToken, requireRole('super-admin'), async (req, res) => {
  const db = req.app.locals.sqliteDb;
  const supabase = req.app.locals.supabase;
  const dbMode = req.app.locals.dbMode;

  try {
    let users = [];

    if (dbMode === 'supabase' && supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, role, tenant_id, display_name, status, created_at, last_login');
      if (error) throw error;
      users = data;
    } else if (db) {
      users = await new Promise((resolve, reject) => {
        db.all(
          'SELECT id, username, role, tenant_id, display_name, status, created_at, last_login FROM users',
          [],
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
    }

    res.json({ users });

  } catch (error) {
    console.error('List users error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users.',
      code: 'LIST_USERS_ERROR'
    });
  }
});

module.exports = router;
