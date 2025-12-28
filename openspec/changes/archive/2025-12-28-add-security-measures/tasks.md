# Tasks: Add Security Measures

## 1. Rate Limiting
- [ ] 1.1 Install rate limiting package (upstash/ratelimit)
- [ ] 1.2 Configure limits per endpoint
- [x] 1.3 Return 429 on limit exceeded (ApiErrors.rateLimited)

## 2. Input Validation
- [x] 2.1 Create Zod schemas for all API inputs
- [x] 2.2 Validate request bodies, params, queries
- [x] 2.3 Sanitize string inputs (via Zod transforms)

## 3. Security Headers
- [x] 3.1 Add Content-Security-Policy
- [x] 3.2 Add X-Frame-Options
- [x] 3.3 Configure in next.config.ts

## 4. Authentication Hardening
- [x] 4.1 Verify Telegram signature on every request
- [x] 4.2 Validate JWT claims
- [ ] 4.3 Implement token rotation
