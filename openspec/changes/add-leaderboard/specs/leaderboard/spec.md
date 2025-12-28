## ADDED Requirements

### Requirement: Weekly Leaderboard
The system SHALL display weekly rankings based on points earned in the current week.

#### Scenario: Weekly ranking calculation
- **WHEN** client requests weekly leaderboard
- **THEN** return users ranked by points earned since last Monday 00:00 UTC

#### Scenario: Weekly reset
- **WHEN** new week begins (Monday 00:00 UTC)
- **THEN** reset weekly point counters and archive previous week

#### Scenario: Current user position
- **WHEN** authenticated user views leaderboard
- **THEN** include user's current rank even if not in top 100

### Requirement: All-Time Leaderboard
The system SHALL display all-time rankings based on total points balance.

#### Scenario: All-time ranking
- **WHEN** client requests all-time leaderboard
- **THEN** return top 100 users ranked by current points balance

#### Scenario: Rank updates
- **WHEN** user's points change
- **THEN** recalculate ranks on next leaderboard request

### Requirement: Top 3 Recognition
The system SHALL provide special recognition for top 3 ranked users.

#### Scenario: Crown display
- **WHEN** displaying leaderboard
- **THEN** show gold crown for #1, silver crown for #2, bronze crown for #3

#### Scenario: 预言大师 badge
- **WHEN** user finishes week in top 3
- **THEN** award "预言大师" badge to user profile

#### Scenario: Badge persistence
- **WHEN** user earns badge
- **THEN** badge remains on profile permanently with date earned

### Requirement: Leaderboard Performance
The system SHALL serve leaderboard data with acceptable latency.

#### Scenario: Cached response
- **WHEN** leaderboard is requested within cache window (5 minutes)
- **THEN** return cached data with cache timestamp

#### Scenario: Cache refresh
- **WHEN** cache expires or is invalidated
- **THEN** recalculate rankings from database

### Requirement: Leaderboard UI
The system SHALL display leaderboard with engagement-focused design.

#### Scenario: Leaderboard toggle
- **WHEN** user views leaderboard
- **THEN** show toggle between "周榜" and "总榜"

#### Scenario: User highlight
- **WHEN** current user appears in leaderboard
- **THEN** highlight their row with distinct background color

#### Scenario: Weekly countdown
- **WHEN** viewing weekly leaderboard
- **THEN** show countdown timer to next weekly reset
