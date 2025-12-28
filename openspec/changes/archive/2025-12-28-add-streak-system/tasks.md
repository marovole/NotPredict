# Tasks: Add Streak System

## 1. Database Updates
- [x] 1.1 Ensure User model has streak and maxStreak fields
- [x] 1.2 Add streak tracking to bet settlement logic

## 2. Streak Logic
- [x] 2.1 Increment streak on correct prediction
- [x] 2.2 Reset streak to 0 on incorrect prediction
- [x] 2.3 Update maxStreak if current exceeds historical max
- [ ] 2.4 Implement 1.2x multiplier for streak >= 3 (in settlement)

## 3. Settlement Integration
- [x] 3.1 Update streak before calculating payout
- [ ] 3.2 Apply multiplier to payout when eligible
- [x] 3.3 Log payouts with correct transaction amount
