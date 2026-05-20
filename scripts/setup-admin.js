#!/usr/bin/env node
/**
 * Setup Script - Creates initial super-admin user
 * Run with: node scripts/setup-admin.js
 */

const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

console.log(`${colors.bright}${colors.blue}
========================================
ZeroPerson Auto - Admin Setup Script
========================================${colors.reset}\n`);

// Get command line arguments
const args = process.argv.slice(2);
const username = args[0] || 'admin';
const password = args[1] || generateRandomPassword();

function generateRandomPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function setupAdmin() {
  const dbPath = path.join(__dirname, '..', 'database.sqlite');
  
  // Check Supabase configuration
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_KEY;
  const useSupabase = sbUrl && sbKey && 
    sbUrl !== 'your-supabase-project-url' && 
    sbKey !== 'your-supabase-anon-key';

  try {
    let db = null;
    let supabase = null;

    if (useSupabase) {
      console.log(`${colors.blue}☁️  Connecting to Supabase...${colors.reset}`);
      supabase = createClient(sbUrl, sbKey);
      
      // Check if users table exists
      const { error: tableError } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      
      if (tableError && tableError.code === '42P01') {
        console.log(`${colors.yellow}⚠️  Users table not found. Please create it in Supabase:${colors.reset}`);
        console.log(`
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super-admin', 'tenant-super', 'tenant-normal')),
  tenant_id TEXT REFERENCES tenants(id),
  display_name TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
        `);
        process.exit(1);
      }
    } else {
      console.log(`${colors.blue}💾 Using SQLite database...${colors.reset}`);
      db = new sqlite3.Database(dbPath);
      
      // Create users table if not exists
      await new Promise((resolve, reject) => {
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('super-admin', 'tenant-super', 'tenant-normal')),
            tenant_id TEXT REFERENCES tenants(id),
            display_name TEXT,
            status TEXT DEFAULT 'active',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            last_login TEXT
          )
        `, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Check if user already exists
    let existingUser = null;
    if (useSupabase && supabase) {
      const { data } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();
      existingUser = data;
    } else if (db) {
      existingUser = await new Promise((resolve, reject) => {
        db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    }

    if (existingUser) {
      console.log(`${colors.yellow}⚠️  User '${username}' already exists.${colors.reset}`);
      
      // Update password
      const passwordHash = await bcrypt.hash(password, 12);
      
      if (useSupabase && supabase) {
        await supabase
          .from('users')
          .update({ password_hash: passwordHash })
          .eq('id', existingUser.id);
      } else if (db) {
        await new Promise((resolve, reject) => {
          db.run('UPDATE users SET password_hash = ? WHERE id = ?', 
            [passwordHash, existingUser.id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
      
      console.log(`${colors.green}✅ Password updated for '${username}'${colors.reset}`);
    } else {
      // Create new admin user
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        id: `user-${Date.now()}`,
        username: username.toLowerCase(),
        password_hash: passwordHash,
        role: 'super-admin',
        tenant_id: null,
        display_name: 'Super Administrator',
        status: 'active',
        created_at: new Date().toISOString()
      };

      if (useSupabase && supabase) {
        await supabase.from('users').insert([newUser]);
      } else if (db) {
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO users (id, username, password_hash, role, tenant_id, display_name, status, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [newUser.id, newUser.username, newUser.password_hash, newUser.role,
             newUser.tenant_id, newUser.display_name, newUser.status, newUser.created_at],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      }
      
      console.log(`${colors.green}✅ Super-admin user '${username}' created successfully!${colors.reset}`);
    }

    console.log(`\n${colors.bright}Login Credentials:${colors.reset}`);
    console.log(`Username: ${colors.yellow}${username}${colors.reset}`);
    console.log(`Password: ${colors.yellow}${password}${colors.reset}`);
    console.log(`\n${colors.green}You can now login to the application.${colors.reset}\n`);

    if (db) {
      db.close();
    }
    process.exit(0);

  } catch (error) {
    console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

setupAdmin();
