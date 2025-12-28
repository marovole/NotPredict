# Change: Add Security Measures

## Why
Production app needs protection against common attacks: rate limiting, input validation, CSRF, and secure headers.

## What Changes
- Add rate limiting middleware
- Implement request validation with Zod
- Add security headers (CSP, HSTS, etc.)
- Validate Telegram auth on all protected routes

## Impact
- Affected specs: security (new capability)
- Affected code: `src/middleware.ts`, all API routes
