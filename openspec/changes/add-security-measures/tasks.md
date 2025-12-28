# Tasks: Add Security Measures

## 1. Rate Limiting
- [ ] 1.1 Install rate limiting package (upstash/ratelimit)
- [ ] 1.2 Configure limits per endpoint
- [ ] 1.3 Return 429 on limit exceeded

## 2. Input Validation
- [ ] 2.1 Create Zod schemas for all API inputs
- [ ] 2.2 Validate request bodies, params, queries
- [ ] 2.3 Sanitize string inputs

## 3. Security Headers
- [ ] 3.1 Add Content-Security-Policy
- [ ] 3.2 Add X-Frame-Options
- [ ] 3.3 Configure in next.config.ts

## 4. Authentication Hardening
- [ ] 4.1 Verify Telegram signature on every request
- [ ] 4.2 Validate JWT claims
- [ ] 4.3 Implement token rotation
