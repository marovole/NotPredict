## ADDED Requirements

### Requirement: Streak Tracking
The system SHALL track consecutive correct predictions for each user.

#### Scenario: Correct prediction
- **WHEN** user's bet wins during settlement
- **THEN** increment user's streak by 1

#### Scenario: Incorrect prediction
- **WHEN** user's bet loses during settlement
- **THEN** reset user's streak to 0

#### Scenario: Max streak tracking
- **WHEN** current streak exceeds user's maxStreak
- **THEN** update maxStreak to current value

### Requirement: Rampage Mode Multiplier
The system SHALL apply 1.2x payout multiplier when user has streak of 3 or more.

#### Scenario: Multiplier activation
- **WHEN** user with streak >= 3 wins a bet
- **THEN** apply 1.2x multiplier to payout amount

#### Scenario: Multiplier calculation
- **WHEN** calculating multiplied payout
- **THEN** compute as: `floor(base_payout * 1.2)`

#### Scenario: Streak below threshold
- **WHEN** user with streak < 3 wins a bet
- **THEN** apply standard payout (no multiplier)

### Requirement: Streak Display
The system SHALL display current streak status in the user interface.

#### Scenario: Active streak display
- **WHEN** user has streak >= 1
- **THEN** show streak count with fire emoji in header

#### Scenario: Rampage mode indicator
- **WHEN** user has streak >= 3
- **THEN** show "暴走模式" badge with special visual effect

#### Scenario: No streak
- **WHEN** user has streak = 0
- **THEN** hide streak indicator from header

### Requirement: Streak Notifications
The system SHALL notify users of streak status changes.

#### Scenario: Entering rampage mode
- **WHEN** user reaches streak of 3
- **THEN** show celebration notification "暴走模式激活！1.2x 加成"

#### Scenario: Streak broken
- **WHEN** user's streak resets from >= 3 to 0
- **THEN** show notification "连胜中断"

#### Scenario: Milestone streaks
- **WHEN** user reaches streak of 5, 10, 15, etc.
- **THEN** show milestone celebration with special animation
