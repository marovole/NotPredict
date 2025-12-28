# Change: Add Leaderboard System

## Why
The PRD specifies social leaderboards with weekly and all-time rankings. This drives competition and engagement. Top 3 players receive crown effects and "预言大师" badges.

## What Changes
- Implement weekly leaderboard with point aggregation
- Implement all-time leaderboard
- Add ranking badges and crown effects for top 3
- Create leaderboard refresh/caching mechanism
- Update current static leaderboard to use real data

## Impact
- Affected specs: leaderboard (new capability)
- Affected code:
  - `src/app/api/leaderboard/` (new)
  - `src/components/Leaderboard.tsx` (modify)
  - Database queries for rankings
