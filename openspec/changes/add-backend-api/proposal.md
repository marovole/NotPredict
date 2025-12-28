# Change: Add Backend API Endpoints

## Why
The frontend currently uses mock data with no server-side logic. A production prediction market requires RESTful APIs for data persistence, business logic enforcement, and multi-user coordination.

## What Changes
- Create Next.js API routes structure under `src/app/api/`
- Implement user, topic, bet, and points management endpoints
- Add Zod schemas for request/response validation
- Integrate with Prisma database layer
- Add proper HTTP status codes and error responses

## Impact
- Affected specs: api (new capability)
- Affected code:
  - `src/app/api/**/*.ts` (new)
  - `src/lib/api/` (new - shared API utilities)
  - `src/lib/validations/` (new - Zod schemas)
