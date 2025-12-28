## ADDED Requirements

### Requirement: Settlement Notifications
The system SHALL notify users via Telegram Bot when their bets settle.

#### Scenario: Win notification
- **WHEN** user's bet wins during settlement
- **THEN** send Telegram message with payout amount and deep link

#### Scenario: Loss notification
- **WHEN** user's bet loses during settlement
- **THEN** send Telegram message with encouragement and deep link

### Requirement: Deep Links
The system SHALL include actionable deep links in notifications.

#### Scenario: Open app from notification
- **WHEN** user clicks notification deep link
- **THEN** open app to relevant section (profile/bet history)
