# Tasks: Add Backend API

## 1. Setup
- [x] 1.1 Create API directory structure
- [x] 1.2 Install Zod for validation (`npm install zod`)
- [x] 1.3 Create shared API utilities (response helpers, error handling)
- [x] 1.4 Create Zod schema definitions for all entities

## 2. User Endpoints
- [x] 2.1 `GET /api/users/me` - Get current authenticated user
- [x] 2.2 `GET /api/users/[id]` - Get user by ID (public profile)
- [x] 2.3 `PATCH /api/users/me` - Update current user profile

## 3. Topic Endpoints
- [x] 3.1 `GET /api/topics` - List active topics (paginated)
- [x] 3.2 `GET /api/topics/[id]` - Get topic details
- [x] 3.3 `POST /api/topics` - Create topic (admin only)
- [x] 3.4 `PATCH /api/topics/[id]` - Update topic (admin only)
- [x] 3.5 `POST /api/topics/[id]/settle` - Settle topic outcome (admin only)

## 4. Bet Endpoints
- [x] 4.1 `POST /api/bets` - Place a bet
- [x] 4.2 `GET /api/bets` - Get current user's bets (consolidated into main route)

## 5. Points Endpoints
- [x] 5.1 `POST /api/points/daily` - Claim daily check-in reward
- [x] 5.2 `POST /api/points/bankrupt` - Claim bankruptcy relief
- [x] 5.3 `GET /api/points/history` - Get transaction history

## 6. Leaderboard Endpoints
- [x] 6.1 `GET /api/leaderboard/weekly` - Get weekly leaderboard
- [x] 6.2 `GET /api/leaderboard/all-time` - Get all-time leaderboard

## 7. Additional
- [x] 7.1 `GET /api/health` - Health check endpoint
