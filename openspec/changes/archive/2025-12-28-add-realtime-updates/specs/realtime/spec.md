## ADDED Requirements

### Requirement: Real-time Pool Updates
The system SHALL push pool changes to connected clients in real-time.

#### Scenario: Bet placed
- **WHEN** any user places bet on a topic
- **THEN** all clients viewing that topic receive updated pool totals

#### Scenario: Pool animation
- **WHEN** pool value updates
- **THEN** animate number change with counting effect

### Requirement: Activity Indicators
The system SHALL show live betting activity on topic cards.

#### Scenario: Active betting
- **WHEN** topic receives bets in last 60 seconds
- **THEN** show pulsing activity indicator

### Requirement: Connection Resilience
The system SHALL maintain stable real-time connection.

#### Scenario: Connection lost
- **WHEN** WebSocket connection drops
- **THEN** attempt automatic reconnection with exponential backoff

#### Scenario: Reconnection sync
- **WHEN** connection is restored
- **THEN** fetch latest data to sync any missed updates
