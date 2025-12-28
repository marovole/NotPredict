# Tasks: Add Real-time Updates

## 1. Realtime Hooks
- [x] 1.1 Create useRealtimeTopics hook with polling
- [x] 1.2 Create useTopicPoolUpdates hook
- [x] 1.3 Handle connection lifecycle with AbortController

## 2. Topic Updates
- [x] 2.1 Subscribe to topic pool changes via polling
- [x] 2.2 Provide callback for UI updates
- [x] 2.3 Add formatPoolChange utility

## 3. Reconnection
- [x] 3.1 Handle connection drops gracefully
- [x] 3.2 Automatic interval-based refresh
- [x] 3.3 Abort pending requests on unmount

Note: Using polling approach for v1. WebSocket/Supabase Realtime can be added later.
