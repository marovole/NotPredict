# Change: Add Push Notifications via Telegram Bot

## Why
PRD specifies Bot notifications for settlement results to drive user recall. Users should be notified when their bets settle.

## What Changes
- Create Telegram Bot for notifications
- Implement notification templates for settlements
- Add notification preferences (opt-in/out)
- Deep link from notifications back to app

## Impact
- Affected specs: notifications (new capability)
- Affected code: `src/lib/telegram-bot/`, settlement integration
