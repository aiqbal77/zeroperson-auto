// Vercel Serverless Function - Main API Entry Point
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');

// Import authentication
const { authenticateToken, requireRole, requireTenantAccess, generateToken } = require('../middleware/auth');
const authRoutes = require('../routes/auth');

const app = express();

// CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Database setup
let dbMode = "sqlite";
let supabase = null;
let sqliteDb = null;

const sbUrl = process.env.SUPABASE_URL;
const sbKey = process.env.SUPABASE_KEY;
const isSupabaseConfigured = sbUrl && sbKey && 
  sbUrl !== 'your-supabase-project-url' && 
  sbKey !== 'your-supabase-anon-key';

if (isSupabaseConfigured) {
  try {
    supabase = createClient(sbUrl, sbKey);
    dbMode = "supabase";
    console.log("☁️ Connected to Supabase");
  } catch (e) {
    console.error("Supabase error:", e);
    dbMode = "sqlite";
  }
}

// SQLite in /tmp for serverless (read-only filesystem except /tmp)
const sqliteDbPath = path.join('/tmp', 'database.sqlite');
sqliteDb = new sqlite3.Database(sqliteDbPath, (err) => {
  if (err) {
    console.error("SQLite error:", err);
  } else {
    console.log("💾 SQLite connected");
    // Create users table if not exists
    sqliteDb.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      tenant_id TEXT,
      display_name TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT,
      last_login TEXT
    )`);
  }
});

app.locals.sqliteDb = sqliteDb;
app.locals.supabase = supabase;
app.locals.dbMode = dbMode;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbMode, timestamp: new Date().toISOString() });
});

// Auth routes (public)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api', authenticateToken);

// Data endpoint
app.get('/api/data/:tenant', requireTenantAccess, async (req, res) => {
  const tenant = req.params.tenant;
  
  try {
    if (dbMode === "supabase" && supabase) {
      const { data: crm, error: c1 } = await supabase.from('crm').select('*').eq('tenant', tenant);
      const { data: rawTeasers, error: c2 } = await supabase.from('teasers').select('*').eq('tenant', tenant);
      
      if (c1 || c2) throw new Error(c1?.message || c2?.message);
      
      const teasers = rawTeasers.map(t => ({
        ...t,
        labelClass: t.label_class,
        benefitDesc: t.benefit_desc,
        crmTag: t.crm_tag,
        crmContact: typeof t.crm_contact === 'string' ? JSON.parse(t.crm_contact) : t.crm_contact
      }));
      
      return res.json({ crm, teasers });
    }
    
    // SQLite fallback
    sqliteDb.all("SELECT * FROM crm WHERE tenant = ?", [tenant], (err, crm) => {
      if (err) return res.status(500).json({ error: err.message });
      
      sqliteDb.all("SELECT * FROM teasers WHERE tenant = ?", [tenant], (err, rawTeasers) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const teasers = rawTeasers.map(t => ({
          ...t,
          labelClass: t.label_class,
          benefitDesc: t.benefit_desc,
          crmTag: t.crm_tag,
          crmContact: JSON.parse(t.crm_contact)
        }));
        
        res.json({ crm, teasers });
      });
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: e.message });
  }
});

// Export for serverless
module.exports = app;
