# Tasks: Add Points Economy System

## 1. Core Points Logic
- [ ] 1.1 Create points service with atomic add/deduct operations
- [ ] 1.2 Implement transaction logging for all point changes
- [ ] 1.3 Add balance validation before deductions

## 2. Daily Check-in
- [ ] 2.1 Implement random reward (100-500 pts)
- [ ] 2.2 Add once-per-day enforcement
- [ ] 2.3 Track check-in streak for potential future bonuses
- [ ] 2.4 Create check-in UI component

## 3. Bankruptcy Relief
- [ ] 3.1 Implement zero-balance detection
- [ ] 3.2 Add 500 pts relief grant
- [ ] 3.3 Enforce once-per-day limit
- [ ] 3.4 Create bankruptcy relief UI prompt

## 4. Referral System
- [ ] 4.1 Generate unique referral codes per user
- [ ] 4.2 Track referral relationships
- [ ] 4.3 Award 500 pts to referrer when referee joins
- [ ] 4.4 Award 500 pts to referee as welcome bonus
- [ ] 4.5 Create referral sharing UI

## 5. Pari-Mutuel Calculation
- [ ] 5.1 Implement payout formula: `stake + (stake / winner_pool) * loser_pool`
- [ ] 5.2 Handle edge cases (empty pools, ties)
- [ ] 5.3 Batch process payouts on topic settlement
- [ ] 5.4 Log all payouts as transactions

## 6. Frontend Integration
- [ ] 6.1 Update points display to use server data
- [ ] 6.2 Add check-in button to home screen
- [ ] 6.3 Show transaction history in profile
- [ ] 6.4 Add referral section to profile
