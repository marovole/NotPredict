## ADDED Requirements

### Requirement: User Data Model
The system SHALL store user accounts with Telegram identity, points balance, and streak information.

#### Scenario: New user registration
- **WHEN** a user accesses the app for the first time
- **THEN** a new user record is created with telegramId, default 1000 points, and 0 streak

#### Scenario: User points update
- **WHEN** a user places a bet or receives rewards
- **THEN** the user's points balance is updated atomically

### Requirement: Topic Data Model
The system SHALL store prediction topics with betting pools, status, and outcome tracking.

#### Scenario: Create new topic
- **WHEN** an admin creates a new prediction topic
- **THEN** a topic record is created with initial zero pools and ACTIVE status

#### Scenario: Topic pool update
- **WHEN** a user places a bet on a topic
- **THEN** the corresponding pool (yesPool or noPool) is incremented atomically

#### Scenario: Topic settlement
- **WHEN** a topic reaches its end date and outcome is determined
- **THEN** the topic status changes to SETTLED and outcome is recorded

### Requirement: Bet Data Model
The system SHALL store individual bet records linking users to topics with direction and amount.

#### Scenario: Place bet
- **WHEN** a user swipes on a topic
- **THEN** a bet record is created with userId, topicId, direction, and amount

#### Scenario: One bet per user per topic
- **WHEN** a user attempts to bet on a topic they already bet on
- **THEN** the system rejects the duplicate bet

#### Scenario: Bet settlement
- **WHEN** a topic is settled
- **THEN** all related bets are marked as settled with won/lost status and payout amount

### Requirement: Transaction Data Model
The system SHALL maintain a complete audit trail of all point movements.

#### Scenario: Record transaction
- **WHEN** any point balance change occurs
- **THEN** a transaction record is created with type, amount, and resulting balance

#### Scenario: Transaction history query
- **WHEN** a user requests their transaction history
- **THEN** transactions are returned in reverse chronological order

### Requirement: Daily Reward Tracking
The system SHALL track daily rewards to enforce once-per-day limits.

#### Scenario: Daily check-in limit
- **WHEN** a user attempts to claim daily check-in
- **THEN** the system verifies no claim exists for the current date

#### Scenario: Bankruptcy relief limit
- **WHEN** a user with zero balance requests bankruptcy relief
- **THEN** the system verifies no bankruptcy claim exists for the current date

### Requirement: Database Connection
The system SHALL use Prisma ORM with connection pooling for serverless environments.

#### Scenario: Prisma client initialization
- **WHEN** the application starts
- **THEN** a singleton Prisma client is created with connection pooling

#### Scenario: Database connectivity
- **WHEN** an API request requires database access
- **THEN** the Prisma client connects to PostgreSQL via Supabase
