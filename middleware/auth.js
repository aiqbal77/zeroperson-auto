/**
 * Authentication Middleware
 * Handles JWT verification and role-based access control
 */

const jwt = require('jsonwebtoken');

// JWT Secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-immediately';

/**
 * Verify JWT token from Authorization header
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied. No token provided.',
      code: 'NO_TOKEN'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    return res.status(403).json({ 
      error: 'Invalid token.',
      code: 'INVALID_TOKEN'
    });
  }
};

/**
 * Check if user has required role
 * @param {...string} allowedRoles - Roles that can access the route
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required.',
        code: 'NOT_AUTHENTICATED'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions.',
        code: 'FORBIDDEN',
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
};

/**
 * Check if user can access specific tenant data
 * Super admins can access all tenants
 * Tenant users can only access their assigned tenant
 */
const requireTenantAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required.',
      code: 'NOT_AUTHENTICATED'
    });
  }

  const requestedTenant = req.params.tenant;

  // Super admins can access any tenant
  if (req.user.role === 'super-admin') {
    return next();
  }

  // Tenant users can only access their assigned tenant
  if (req.user.tenantId === requestedTenant) {
    return next();
  }

  return res.status(403).json({ 
    error: 'Access denied to this tenant.',
    code: 'TENANT_FORBIDDEN',
    yourTenant: req.user.tenantId,
    requestedTenant: requestedTenant
  });
};

/**
 * Optional authentication - sets req.user if token valid, but doesn't require it
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // Silent fail - user not set but request continues
    }
  }
  next();
};

/**
 * Generate JWT token for user
 */
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    tenantId: user.tenant_id
  };

  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

module.exports = {
  authenticateToken,
  requireRole,
  requireTenantAccess,
  optionalAuth,
  generateToken,
  JWT_SECRET
};
