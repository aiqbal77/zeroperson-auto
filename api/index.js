// Vercel Serverless Function - Main API Entry Point
try {
  const express = require('express');
  const cors = require('cors');
  const path = require('path');
  
  // Try to load optional dependencies
  let sqlite3 = null;
  let supabaseJs = null;
  
  try {
    sqlite3 = require('sqlite3').verbose();
  } catch (e) {
    console.log('SQLite3 not available');
  }
  
  try {
    supabaseJs = require('@supabase/supabase-js');
  } catch (e) {
    console.log('Supabase not available');
  }

  // Try to load auth modules
  let authMiddleware = null;
  let authRoutes = null;
  
  try {
    authMiddleware = require('../middleware/auth');
    authRoutes = require('../routes/auth');
  } catch (e) {
    console.error('Auth modules load error:', e.message);
  }

  const app = express();

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Express error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  });

  // CORS
  app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json());

  // Health check - always works
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      modules: {
        sqlite: !!sqlite3,
        supabase: !!supabaseJs,
        auth: !!authMiddleware
      },
      env: {
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        nodeEnv: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString() 
    });
  });

  // If auth modules loaded, set up auth routes
  if (authMiddleware && authRoutes) {
    const { authenticateToken, requireTenantAccess } = authMiddleware;
    
    // Database setup
    let dbMode = "none";
    let supabase = null;
    let sqliteDb = null;

    // Try Supabase
    if (supabaseJs && process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      try {
        const { createClient } = supabaseJs;
        supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
        dbMode = "supabase";
      } catch (e) {
        console.error('Supabase init error:', e.message);
      }
    }

    // Try SQLite (may not work in serverless)
    if (sqlite3) {
      try {
        const sqliteDbPath = path.join('/tmp', 'database.sqlite');
        sqliteDb = new sqlite3.Database(sqliteDbPath);
        dbMode = dbMode === "supabase" ? "supabase" : "sqlite";
      } catch (e) {
        console.error('SQLite init error:', e.message);
      }
    }

    app.locals.sqliteDb = sqliteDb;
    app.locals.supabase = supabase;
    app.locals.dbMode = dbMode;

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
        
        res.json({ crm: [], teasers: [] });
      } catch (e) {
        console.error("Data error:", e);
        res.status(500).json({ error: e.message });
      }
    });
  } else {
    // Auth not available
    app.use('/api/auth', (req, res) => {
      res.status(500).json({ error: 'Authentication module not loaded', details: 'Check server logs' });
    });
  }

  // Vercel serverless handler
  module.exports = (req, res) => {
    return app(req, res);
  };

} catch (startupError) {
  // Critical startup error
  console.error('CRITICAL STARTUP ERROR:', startupError);
  
  module.exports = (req, res) => {
    res.status(500).json({ 
      error: 'Serverless function failed to start',
      details: startupError.message,
      stack: startupError.stack
    });
  };
}
