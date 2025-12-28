# Tasks: Add Leaderboard System

## 1. Backend Implementation
- [ ] 1.1 Create weekly points aggregation query
- [ ] 1.2 Create all-time ranking query
- [ ] 1.3 Implement pagination for leaderboard
- [ ] 1.4 Add caching layer for leaderboard data
- [ ] 1.5 Include current user's rank in response

## 2. API Endpoints
- [ ] 2.1 `GET /api/leaderboard/weekly` - Weekly rankings
- [ ] 2.2 `GET /api/leaderboard/all-time` - All-time rankings
- [ ] 2.3 `GET /api/leaderboard/my-rank` - Current user's rank

## 3. Badges and Achievements
- [ ] 3.1 Design badge system schema
- [ ] 3.2 Implement "预言大师" badge for top 3
- [ ] 3.3 Award badges at end of each week
- [ ] 3.4 Display badges on user profiles

## 4. Frontend Updates
- [ ] 4.1 Replace mock leaderboard data with API
- [ ] 4.2 Add weekly/all-time toggle
- [ ] 4.3 Implement crown effects for top 3
- [ ] 4.4 Highlight current user in list
- [ ] 4.5 Add pull-to-refresh functionality
- [ ] 4.6 Display time remaining until weekly reset

## 5. Scheduled Jobs
- [ ] 5.1 Weekly leaderboard reset job
- [ ] 5.2 Badge distribution at week end
- [ ] 5.3 Archive historical weekly rankings
