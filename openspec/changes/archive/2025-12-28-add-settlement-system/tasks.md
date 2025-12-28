# Tasks: Add Topic Settlement System

## 1. Settlement Logic
- [x] 1.1 Implement outcome determination (YES/NO/CANCELLED)
- [x] 1.2 Calculate winner pool and loser pool totals
- [x] 1.3 Implement pari-mutuel payout distribution
- [ ] 1.4 Apply streak multipliers to payouts
- [x] 1.5 Handle edge cases (no losers, cancelled topics)

## 2. Database Updates
- [x] 2.1 Update topic status to SETTLED
- [x] 2.2 Record topic outcome
- [x] 2.3 Mark all bets as settled with won/payout
- [x] 2.4 Update user streaks based on results
- [x] 2.5 Update user point balances
- [x] 2.6 Log all payout transactions

## 3. Admin Settlement API
- [x] 3.1 Create `POST /api/topics/[id]/settle` endpoint
- [x] 3.2 Validate admin authorization (x-admin-id header)
- [x] 3.3 Accept outcome parameter (YES/NO/CANCELLED)
- [x] 3.4 Execute settlement in database transaction
