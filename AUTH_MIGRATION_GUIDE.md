# ZeroPerson Auto - Authentication Migration Guide

## Overview

This guide documents the migration from **insecure hardcoded credentials** to **secure JWT-based authentication**.

## Security Issues Fixed

### Before (INSECURE - Original Code)
```javascript
// HARDCODED CREDENTIALS - VISIBLE TO ANYONE
if (userVal === "ansar" && passVal === "ansar123") {
  currentUser = { username: "Ansar", role: "super-admin" };
}
```

**Problems:**
- Passwords visible in client-side JavaScript
- No server-side validation
- No password hashing
- No session management
- Anyone can view source and see all credentials

### After (SECURE - New Implementation)
- ✅ **Passwords hashed** with bcrypt (cost factor 12)
- ✅ **JWT tokens** for session management (24h expiration)
- ✅ **Server-side validation** - no credentials in frontend
- ✅ **Protected API routes** - all data endpoints require valid token
- ✅ **Tenant isolation** enforced at middleware level

## Files Changed

| File | Changes |
|------|---------|
| `package.json` | Added `jsonwebtoken` and `bcryptjs` dependencies |
| `server.js` | Added JWT auth, protected routes, users table |
| `app.js` | Replaced hardcoded auth with JWT-based auth |
| `middleware/auth.js` | NEW - JWT verification & role-based access control |
| `routes/auth.js` | NEW - Login, logout, register, password change endpoints |
| `scripts/setup-admin.js` | NEW - CLI tool to create admin users |
| `.env.example` | NEW - Environment variable template |

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and set JWT_SECRET (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
```

### 3. Create Admin User
```bash
node scripts/setup-admin.js admin yourpassword
```

### 4. Start Server
```bash
npm run dev
```

## API Endpoints

### Public
- `POST /api/auth/login` - Login, returns JWT token
- `POST /api/voice-webhook` - Vapi voice webhook

### Protected (Require Bearer Token)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `GET /api/data/:tenant` - Get CRM data
- `POST /api/crm/:tenant` - Add lead
- `PATCH /api/crm/:tenant/:id` - Update lead
- `DELETE /api/crm/:tenant/:id` - Delete lead

## Role-Based Access

| Role | Description |
|------|-------------|
| `super-admin` | Full access to all tenants |
| `tenant-super` | Full access to assigned tenant only |
| `tenant-normal` | Read-only access to assigned tenant |

## Testing

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "yourpassword"}'
```

### Access Protected Route
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/data/dental
```

## Production Checklist

- [ ] Change default JWT_SECRET to a strong random value
- [ ] Enable HTTPS (required for secure storage)
- [ ] Set secure HTTP headers
- [ ] Configure rate limiting on login endpoint
- [ ] Set up monitoring for failed auth attempts

## Support

For issues:
1. Check server logs for error messages
2. Verify JWT_SECRET is set correctly
3. Ensure database tables are created
4. Test with `node scripts/setup-admin.js`
