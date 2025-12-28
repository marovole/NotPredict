## ADDED Requirements

### Requirement: User API Endpoints
The system SHALL provide REST endpoints for user profile management.

#### Scenario: Get current user
- **WHEN** authenticated user calls `GET /api/users/me`
- **THEN** return user profile with points, streak, and stats

#### Scenario: Get user by ID
- **WHEN** client calls `GET /api/users/[id]`
- **THEN** return public user profile (username, points, rank)

#### Scenario: Unauthenticated access
- **WHEN** unauthenticated client calls protected endpoint
- **THEN** return 401 Unauthorized with error message

### Requirement: Topic API Endpoints
The system SHALL provide REST endpoints for topic management and retrieval.

#### Scenario: List active topics
- **WHEN** client calls `GET /api/topics`
- **THEN** return paginated list of active topics sorted by creation date

#### Scenario: Get topic details
- **WHEN** client calls `GET /api/topics/[id]`
- **THEN** return topic with pools, participant count, and user's bet if exists

#### Scenario: Create topic (admin)
- **WHEN** admin calls `POST /api/topics` with valid payload
- **THEN** create new topic and return created entity

#### Scenario: Settle topic (admin)
- **WHEN** admin calls `POST /api/topics/[id]/settle` with outcome
- **THEN** mark topic as settled and trigger payout calculations

### Requirement: Bet API Endpoints
The system SHALL provide REST endpoints for placing and viewing bets.

#### Scenario: Place bet
- **WHEN** authenticated user calls `POST /api/bets` with topicId, direction, amount
- **THEN** create bet, deduct points, update topic pool, return bet details

#### Scenario: Duplicate bet prevention
- **WHEN** user attempts to bet on same topic twice
- **THEN** return 409 Conflict with error message

#### Scenario: Insufficient points
- **WHEN** user attempts to bet more points than available
- **THEN** return 400 Bad Request with error message

#### Scenario: Get my bets
- **WHEN** authenticated user calls `GET /api/bets/my`
- **THEN** return paginated list of user's bets with topic info

### Requirement: Points API Endpoints
The system SHALL provide REST endpoints for points rewards and history.

#### Scenario: Daily check-in
- **WHEN** authenticated user calls `POST /api/points/daily`
- **THEN** add random 100-500 points and return amount awarded

#### Scenario: Daily check-in already claimed
- **WHEN** user calls `POST /api/points/daily` twice in same day
- **THEN** return 409 Conflict with next available time

#### Scenario: Bankruptcy relief
- **WHEN** user with 0 points calls `POST /api/points/bankrupt`
- **THEN** add 500 points if not claimed today

#### Scenario: Bankruptcy with balance
- **WHEN** user with points > 0 calls `POST /api/points/bankrupt`
- **THEN** return 400 Bad Request (not eligible)

### Requirement: Leaderboard API Endpoints
The system SHALL provide REST endpoints for ranking data.

#### Scenario: Weekly leaderboard
- **WHEN** client calls `GET /api/leaderboard/weekly`
- **THEN** return top 100 users by points earned this week

#### Scenario: All-time leaderboard
- **WHEN** client calls `GET /api/leaderboard/all-time`
- **THEN** return top 100 users by total points

### Requirement: API Response Format
The system SHALL use consistent JSON response format for all endpoints.

#### Scenario: Success response
- **WHEN** API operation succeeds
- **THEN** return `{ success: true, data: ... }` with appropriate status code

#### Scenario: Error response
- **WHEN** API operation fails
- **THEN** return `{ success: false, error: { code, message } }` with appropriate status code

### Requirement: Request Validation
The system SHALL validate all incoming requests using Zod schemas.

#### Scenario: Valid request
- **WHEN** request matches Zod schema
- **THEN** proceed with operation

#### Scenario: Invalid request
- **WHEN** request fails Zod validation
- **THEN** return 400 Bad Request with validation errors
