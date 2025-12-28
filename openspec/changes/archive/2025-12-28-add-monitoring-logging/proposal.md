# Change: Add Monitoring and Logging

## Why
Production requires observability for debugging, performance tracking, and error alerting.

## What Changes
- Add structured logging with Pino
- Integrate Sentry for error tracking
- Add Vercel Analytics for performance
- Create health check endpoint

## Impact
- Affected specs: monitoring (new capability)
- Affected code: `src/lib/logger.ts`, Sentry setup
