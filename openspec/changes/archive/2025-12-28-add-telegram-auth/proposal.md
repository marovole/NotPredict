# Change: Add Telegram Authentication

## Why
The app runs as a Telegram WebApp but lacks proper user authentication. We need to validate Telegram's initData, extract user identity, and maintain secure sessions for API access.

## What Changes
- Implement Telegram initData signature verification
- Create JWT-based session management
- Add authentication middleware for API routes
- Implement silent user registration on first access
- Store Telegram user data in database

## Impact
- Affected specs: auth (new capability)
- Affected code:
  - `src/lib/auth/telegram.ts` (new)
  - `src/lib/auth/jwt.ts` (new)
  - `src/middleware.ts` (new)
  - `src/app/api/auth/telegram/route.ts` (new)
