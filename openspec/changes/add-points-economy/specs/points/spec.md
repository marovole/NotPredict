## ADDED Requirements

### Requirement: Atomic Points Operations
The system SHALL manage points with atomic database transactions to prevent race conditions.

#### Scenario: Concurrent point deductions
- **WHEN** multiple operations attempt to deduct points simultaneously
- **THEN** only succeed if balance remains non-negative after all operations

#### Scenario: Transaction rollback
- **WHEN** a points operation fails mid-transaction
- **THEN** rollback all changes and maintain data integrity

### Requirement: Daily Check-in Rewards
The system SHALL award random points (100-500) for daily check-in, once per calendar day.

#### Scenario: First check-in of the day
- **WHEN** user claims daily reward with no prior claim today
- **THEN** award random amount between 100-500 points

#### Scenario: Duplicate check-in attempt
- **WHEN** user attempts to claim daily reward twice in one day
- **THEN** reject with time until next available claim

#### Scenario: Check-in reward distribution
- **WHEN** generating daily reward amount
- **THEN** use uniform random distribution between 100-500

### Requirement: Bankruptcy Relief
The system SHALL provide 500 points to users with zero balance, once per day.

#### Scenario: Eligible bankruptcy claim
- **WHEN** user with 0 points requests relief with no prior claim today
- **THEN** award 500 points and log as BANKRUPTCY_RELIEF transaction

#### Scenario: Non-zero balance
- **WHEN** user with points > 0 requests bankruptcy relief
- **THEN** reject with "not eligible" error

#### Scenario: Already claimed today
- **WHEN** user requests bankruptcy relief twice in one day
- **THEN** reject with time until next available claim

### Requirement: Referral Bonus System
The system SHALL award 500 points to both referrer and referee upon successful referral.

#### Scenario: Generate referral code
- **WHEN** user requests their referral code
- **THEN** return unique, shareable referral code

#### Scenario: Successful referral
- **WHEN** new user registers with valid referral code
- **THEN** award 500 points to referrer AND 500 points to referee

#### Scenario: Self-referral prevention
- **WHEN** user attempts to use their own referral code
- **THEN** reject referral code

#### Scenario: Invalid referral code
- **WHEN** user registers with non-existent referral code
- **THEN** proceed with registration without referral bonus

### Requirement: Pari-Mutuel Payout Calculation
The system SHALL calculate payouts using pari-mutuel formula when topics settle.

#### Scenario: Winner payout calculation
- **WHEN** topic settles with outcome YES or NO
- **THEN** calculate each winner's payout as: `stake + (stake / winner_pool) * loser_pool`

#### Scenario: Loser handling
- **WHEN** user bet on losing side
- **THEN** mark bet as lost with 0 payout (stake already deducted)

#### Scenario: Empty loser pool
- **WHEN** topic settles with 0 bets on losing side
- **THEN** return original stake to winners (no profit)

#### Scenario: Rounding
- **WHEN** payout calculation results in fractional points
- **THEN** round down to nearest integer (floor)

### Requirement: Transaction History
The system SHALL maintain complete history of all point movements.

#### Scenario: Record bet placement
- **WHEN** user places a bet
- **THEN** log BET_PLACED transaction with negative amount

#### Scenario: Record bet win
- **WHEN** user wins a bet
- **THEN** log BET_WON transaction with payout amount

#### Scenario: View transaction history
- **WHEN** user requests transaction history
- **THEN** return paginated list with type, amount, balance, and timestamp
