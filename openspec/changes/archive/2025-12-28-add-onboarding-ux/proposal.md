# Change: Add Onboarding UX

## Why
New users need guided introduction to the swipe-to-bet mechanic. PRD specifies a "新手礼包" and first swipe practice flow.

## What Changes
- Add new user detection and welcome modal
- Implement tutorial overlay for first swipe
- Create practice card that doesn't affect real balance
- Award starting bonus upon tutorial completion

## Impact
- Affected specs: onboarding (new capability)
- Affected code: `src/components/Onboarding/`, `src/lib/store.ts`
