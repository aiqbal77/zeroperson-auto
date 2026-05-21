// Vercel Serverless Function - API Entry Point
// Wraps server.js to work with Vercel's serverless handler format

let app;
let initError = null;

try {
  // Require the main server module
  app = require('../server.js');
  
  // Verify app is an Express instance
  if (!app || typeof app.handle !== 'function') {
    throw new Error('server.js did not export valid Express app');
  }
  
  console.log('✅ Server module loaded successfully');
  
} catch (err) {
  console.error('❌ Failed to load server.js:', err.message);
  initError = err;
  
  // Create minimal fallback app for error responses
  const express = require('express');
  app = express();
  
  // Error health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(503).json({
      status: 'error',
      error: initError ? initError.message : 'Unknown initialization error',
      stack: initError ? initError.stack : null,
      loaded: false,
      timestamp: new Date().toISOString()
    });
  });
  
  // Auth module error
  app.use('/api/auth', (req, res) => {
    res.status(503).json({
      error: 'Authentication module unavailable',
      details: initError ? initError.message : 'Server initialization failed',
      hint: 'Check Vercel function logs for more details'
    });
  });
  
  // Generic API error
  app.use('/api', (req, res) => {
    res.status(503).json({
      error: 'API unavailable',
      details: initError ? initError.message : 'Server initialization failed'
    });
  });
}

// Vercel serverless handler - wraps Express app
module.exports = (req, res) => {
  // Add error handling wrapper
  const originalEnd = res.end;
  res.end = function(...args) {
    if (res.statusCode >= 500 && res.statusCode < 600) {
      console.error(`Server error: ${res.statusCode} - ${req.method} ${req.url}`);
    }
    return originalEnd.apply(this, args);
  };
  
  return app(req, res);
};