# Tasks: Add Telegram Authentication

## 1. Setup
- [x] 1.1 Add environment variables for `TELEGRAM_BOT_TOKEN` and `JWT_SECRET`
- [x] 1.2 Install crypto dependencies if needed (using jose for JWT)

## 2. Telegram Verification
- [x] 2.1 Implement initData parsing from Telegram WebApp
- [x] 2.2 Implement HMAC-SHA256 signature verification
- [x] 2.3 Validate auth_date is within acceptable time window
- [x] 2.4 Extract user data (id, username, first_name, photo_url)

## 3. Session Management
- [x] 3.1 Create JWT token generation with user payload
- [x] 3.2 Create JWT token verification
- [x] 3.3 Set token expiration (7 days recommended)
- [x] 3.4 Implement token refresh mechanism (via re-auth)

## 4. Authentication Endpoint
- [x] 4.1 Create `POST /api/auth/telegram` endpoint
- [x] 4.2 Verify initData signature
- [x] 4.3 Create or update user in database
- [x] 4.4 Return JWT token and user data

## 5. Middleware
- [x] 5.1 Create authentication middleware for API routes
- [x] 5.2 Extract and verify JWT from Authorization header
- [x] 5.3 Attach user to request context
- [x] 5.4 Define public vs protected routes
