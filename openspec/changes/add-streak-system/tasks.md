# Tasks: Add Streak System

## 1. Database Updates
- [ ] 1.1 Ensure User model has streak and maxStreak fields
- [ ] 1.2 Add streak tracking to bet settlement logic

## 2. Streak Logic
- [ ] 2.1 Increment streak on correct prediction
- [ ] 2.2 Reset streak to 0 on incorrect prediction
- [ ] 2.3 Update maxStreak if current exceeds historical max
- [ ] 2.4 Implement 1.2x multiplier for streak >= 3

## 3. Settlement Integration
- [ ] 3.1 Update streak before calculating payout
- [ ] 3.2 Apply multiplier to payout when eligible
- [ ] 3.3 Log multiplied payouts with correct transaction amount

## 4. Frontend UI
- [ ] 4.1 Display current streak in header
- [ ] 4.2 Add fire emoji animation for active streaks
- [ ] 4.3 Show "暴走模式" indicator when streak >= 3
- [ ] 4.4 Display streak break notification on loss
- [ ] 4.5 Show max streak in profile

## 5. Notifications
- [ ] 5.1 Notify user when entering rampage mode
- [ ] 5.2 Celebrate milestone streaks (5, 10, etc.)
