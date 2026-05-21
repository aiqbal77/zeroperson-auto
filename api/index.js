// Vercel Serverless Function - Main API Entry Point
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Import authentication middleware and routes
// Note: We use relative paths from the api folder
const { authenticateToken, requireRole, requireTenantAccess } = require('../middleware/auth');
const authRoutes = require('../routes/auth');

const app = express();

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Attach to app locals for routes to use
app.locals.supabase = supabase;
app.locals.dbMode = supabase ? "supabase" : "sqlite";

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    dbMode: app.locals.dbMode,
    timestamp: new Date().toISOString(),
    env: {
      hasSupabase: !!supabase,
      hasJwtSecret: !!process.env.JWT_SECRET,
      supabaseUrlPrefix: supabaseUrl ? supabaseUrl.substring(0, 15) + '...' : 'none',
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// Authentication Routes (Public)
app.use('/api/auth', authRoutes);

// Protected API Routes
app.use('/api', authenticateToken);

// Data Endpoint (Protected)
app.get('/api/data/:tenant', requireTenantAccess, async (req, res) => {
  const tenant = req.params.tenant;
  
  if (!supabase) {
    return res.status(500).json({ error: "Cloud database not configured" });
  }

  try {
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

    res.json({ crm, teasers });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Export the Express app as a Vercel Serverless Function
module.exports = app;
