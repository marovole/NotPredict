# Change: Add Real-time Updates

## Why
Users should see live pool updates and participant counts without refreshing. This creates engagement and FOMO.

## What Changes
- Implement WebSocket or Supabase Realtime subscriptions
- Push pool updates when bets are placed
- Update participant counts in real-time
- Show live activity indicators on cards

## Impact
- Affected specs: realtime (new capability)
- Affected code: `src/lib/realtime/`, `src/components/SwipeCard.tsx`
