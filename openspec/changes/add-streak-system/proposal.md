# Change: Add Streak System

## Why
The PRD specifies a streak system where consecutive correct predictions trigger "暴走模式" (rampage mode) with 1.2x point multiplier after 3 wins. This gamification element increases engagement and rewards skilled predictors.

## What Changes
- Track consecutive correct predictions per user
- Implement streak multiplier (1.2x after 3 consecutive wins)
- Add streak break detection on loss
- Display streak status in UI with visual effects
- Track max streak for achievements

## Impact
- Affected specs: streaks (new capability)
- Affected code:
  - `src/lib/streaks/` (new)
  - User model streak fields
  - Settlement logic for streak updates
  - UI streak display components
