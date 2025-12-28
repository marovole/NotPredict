## ADDED Requirements

### Requirement: Topic Settlement Execution
The system SHALL settle topics by determining outcome and distributing payouts.

#### Scenario: Settle with YES outcome
- **WHEN** admin settles topic with outcome = YES
- **THEN** mark all YES bets as won and NO bets as lost

#### Scenario: Settle with NO outcome
- **WHEN** admin settles topic with outcome = NO
- **THEN** mark all NO bets as won and YES bets as lost

#### Scenario: Cancel topic
- **WHEN** admin settles topic as CANCELLED
- **THEN** refund all bets at original stake amount

### Requirement: Pari-Mutuel Payout Distribution
The system SHALL calculate payouts using pari-mutuel formula.

#### Scenario: Calculate winner payout
- **WHEN** topic is settled with winners
- **THEN** each winner receives: `stake + (stake / winner_pool) * loser_pool`

#### Scenario: Apply streak multiplier
- **WHEN** winner has streak >= 3
- **THEN** apply 1.2x multiplier to payout before crediting

#### Scenario: No loser pool
- **WHEN** topic settles with 0 points in loser pool
- **THEN** return original stake to winners

#### Scenario: Payout rounding
- **WHEN** payout calculation produces decimal
- **THEN** round down to integer (floor)

### Requirement: Settlement Atomicity
The system SHALL execute settlement as atomic transaction.

#### Scenario: Successful settlement
- **WHEN** settlement completes without error
- **THEN** all updates (topic, bets, balances, transactions) are committed

#### Scenario: Settlement failure
- **WHEN** any part of settlement fails
- **THEN** rollback all changes and return error

#### Scenario: Concurrent settlement prevention
- **WHEN** settlement is attempted on already-settled topic
- **THEN** reject with "already settled" error

### Requirement: Settlement Notifications
The system SHALL notify participants of settlement results.

#### Scenario: Winner notification
- **WHEN** user's bet wins
- **THEN** send Telegram notification with topic, outcome, and payout amount

#### Scenario: Loser notification
- **WHEN** user's bet loses
- **THEN** send Telegram notification with topic, outcome, and encouragement

#### Scenario: Refund notification
- **WHEN** topic is cancelled
- **THEN** send Telegram notification with refund amount

### Requirement: Settlement UI
The system SHALL display settlement status in user interface.

#### Scenario: Settled topic card
- **WHEN** viewing a settled topic
- **THEN** show outcome badge (YES/NO) and disable betting

#### Scenario: Bet history payout
- **WHEN** viewing settled bet in history
- **THEN** show won/lost status and payout amount if won
