# Tasks: Add Telegram Authentication

## 1. Setup
- [ ] 1.1 Add environment variables for `TELEGRAM_BOT_TOKEN` and `JWT_SECRET`
- [ ] 1.2 Install crypto dependencies if needed

## 2. Telegram Verification
- [ ] 2.1 Implement initData parsing from Telegram WebApp
- [ ] 2.2 Implement HMAC-SHA256 signature verification
- [ ] 2.3 Validate auth_date is within acceptable time window
- [ ] 2.4 Extract user data (id, username, first_name, photo_url)

## 3. Session Management
- [ ] 3.1 Create JWT token generation with user payload
- [ ] 3.2 Create JWT token verification
- [ ] 3.3 Set token expiration (7 days recommended)
- [ ] 3.4 Implement token refresh mechanism

## 4. Authentication Endpoint
- [ ] 4.1 Create `POST /api/auth/telegram` endpoint
- [ ] 4.2 Verify initData signature
- [ ] 4.3 Create or update user in database
- [ ] 4.4 Return JWT token and user data

## 5. Middleware
- [ ] 5.1 Create authentication middleware for API routes
- [ ] 5.2 Extract and verify JWT from Authorization header
- [ ] 5.3 Attach user to request context
- [ ] 5.4 Define public vs protected routes

## 6. Frontend Integration
- [ ] 6.1 Get initData from Telegram WebApp SDK
- [ ] 6.2 Call auth endpoint on app initialization
- [ ] 6.3 Store JWT token in memory/secure storage
- [ ] 6.4 Attach token to all API requests
