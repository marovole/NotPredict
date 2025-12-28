# Change: Add Topic Settlement System

## Why
Topics need to be resolved when their end date passes. The settlement system determines outcomes, calculates payouts using pari-mutuel algorithm, and distributes points to winners.

## What Changes
- Implement topic settlement workflow
- Calculate and distribute pari-mutuel payouts
- Update all related bets with win/loss status
- Send settlement notifications to participants
- Admin interface for manually triggering settlement

## Impact
- Affected specs: settlement (new capability)
- Affected code:
  - `src/lib/settlement/` (new)
  - `src/app/api/topics/[id]/settle/` (new)
  - Telegram Bot notifications
