# Tasks: Add Points Economy System

## 1. Core Points Logic
- [x] 1.1 Create points service with atomic add/deduct operations (in Prisma transactions)
- [x] 1.2 Implement transaction logging for all point changes
- [x] 1.3 Add balance validation before deductions

## 2. Daily Check-in
- [x] 2.1 Implement random reward (100-500 pts) - using fixed 100 pts for v1
- [x] 2.2 Add once-per-day enforcement
- [x] 2.3 Track check-in streak for potential future bonuses (DailyReward model)
- [ ] 2.4 Create check-in UI component (frontend)

## 3. Bankruptcy Relief
- [x] 3.1 Implement low-balance detection (< 50 pts threshold)
- [x] 3.2 Add 500 pts relief grant
- [x] 3.3 Enforce 24-hour cooldown limit
- [ ] 3.4 Create bankruptcy relief UI prompt (frontend)

## 4. Referral System
- [x] 4.1 Generate unique referral codes per user (in User model)
- [x] 4.2 Track referral relationships (referredBy field)
- [ ] 4.3 Award 500 pts to referrer when referee joins (needs endpoint)
- [x] 4.4 Award welcome bonus to new users
- [ ] 4.5 Create referral sharing UI (frontend)

## 5. Pari-Mutuel Calculation
- [x] 5.1 Implement payout formula in settlement endpoint
- [x] 5.2 Handle edge cases (empty pools)
- [x] 5.3 Batch process payouts on topic settlement
- [x] 5.4 Log all payouts as transactions
