# Tasks: Add Topic Settlement System

## 1. Settlement Logic
- [ ] 1.1 Implement outcome determination (YES/NO/CANCELLED)
- [ ] 1.2 Calculate winner pool and loser pool totals
- [ ] 1.3 Implement pari-mutuel payout distribution
- [ ] 1.4 Apply streak multipliers to payouts
- [ ] 1.5 Handle edge cases (no losers, cancelled topics)

## 2. Database Updates
- [ ] 2.1 Update topic status to SETTLED
- [ ] 2.2 Record topic outcome
- [ ] 2.3 Mark all bets as settled with won/payout
- [ ] 2.4 Update user streaks based on results
- [ ] 2.5 Update user point balances
- [ ] 2.6 Log all payout transactions

## 3. Admin Settlement API
- [ ] 3.1 Create `POST /api/topics/[id]/settle` endpoint
- [ ] 3.2 Validate admin authorization
- [ ] 3.3 Accept outcome parameter (YES/NO/CANCELLED)
- [ ] 3.4 Execute settlement in database transaction

## 4. Automated Settlement
- [ ] 4.1 Create scheduled job to check for ended topics
- [ ] 4.2 Auto-settle topics with clear outcomes (if applicable)
- [ ] 4.3 Flag ambiguous topics for manual review

## 5. Notifications
- [ ] 5.1 Notify winners via Telegram Bot
- [ ] 5.2 Notify losers via Telegram Bot
- [ ] 5.3 Include payout amount and new balance
- [ ] 5.4 Deep link back to app

## 6. Frontend Updates
- [ ] 6.1 Show settled status on topic cards
- [ ] 6.2 Display outcome on bet history
- [ ] 6.3 Show payout received in profile
