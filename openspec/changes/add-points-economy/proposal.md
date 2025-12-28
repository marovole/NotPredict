# Change: Add Points Economy System

## Why
The PRD specifies a complete points economy with daily check-in, referral bonuses, bankruptcy relief, and the pari-mutuel settlement algorithm. The current implementation only has basic client-side point tracking without server enforcement.

## What Changes
- Implement server-side points management with atomic transactions
- Add daily check-in reward system (100-500 pts random)
- Add referral bonus system (500 pts for both parties)
- Add bankruptcy relief (500 pts when balance is zero, once daily)
- Implement pari-mutuel payout calculation

## Impact
- Affected specs: points (new capability)
- Affected code:
  - `src/lib/points/` (new)
  - `src/app/api/points/` (new endpoints)
  - Database transaction records
