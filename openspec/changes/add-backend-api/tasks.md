# Tasks: Add Backend API

## 1. Setup
- [ ] 1.1 Create API directory structure
- [ ] 1.2 Install Zod for validation (`npm install zod`)
- [ ] 1.3 Create shared API utilities (response helpers, error handling)
- [ ] 1.4 Create Zod schema definitions for all entities

## 2. User Endpoints
- [ ] 2.1 `GET /api/users/me` - Get current authenticated user
- [ ] 2.2 `GET /api/users/[id]` - Get user by ID (public profile)
- [ ] 2.3 `PATCH /api/users/me` - Update current user profile

## 3. Topic Endpoints
- [ ] 3.1 `GET /api/topics` - List active topics (paginated)
- [ ] 3.2 `GET /api/topics/[id]` - Get topic details
- [ ] 3.3 `POST /api/topics` - Create topic (admin only)
- [ ] 3.4 `PATCH /api/topics/[id]` - Update topic (admin only)
- [ ] 3.5 `POST /api/topics/[id]/settle` - Settle topic outcome (admin only)

## 4. Bet Endpoints
- [ ] 4.1 `POST /api/bets` - Place a bet
- [ ] 4.2 `GET /api/bets/my` - Get current user's bets
- [ ] 4.3 `GET /api/bets/topic/[topicId]` - Get bets for a topic

## 5. Points Endpoints
- [ ] 5.1 `POST /api/points/daily` - Claim daily check-in reward
- [ ] 5.2 `POST /api/points/bankrupt` - Claim bankruptcy relief
- [ ] 5.3 `GET /api/points/history` - Get transaction history

## 6. Leaderboard Endpoints
- [ ] 6.1 `GET /api/leaderboard/weekly` - Get weekly leaderboard
- [ ] 6.2 `GET /api/leaderboard/all-time` - Get all-time leaderboard

## 7. Integration
- [ ] 7.1 Update frontend to use real API instead of mock data
- [ ] 7.2 Add loading states and error handling in components
- [ ] 7.3 Update Zustand store to sync with server
