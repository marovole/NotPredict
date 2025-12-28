## ADDED Requirements

### Requirement: Telegram InitData Verification
The system SHALL verify Telegram WebApp initData signature to authenticate users.

#### Scenario: Valid initData
- **WHEN** client provides initData with valid HMAC-SHA256 signature
- **THEN** extract user identity and proceed with authentication

#### Scenario: Invalid signature
- **WHEN** client provides initData with invalid signature
- **THEN** reject authentication with 401 Unauthorized

#### Scenario: Expired initData
- **WHEN** client provides initData older than 24 hours
- **THEN** reject authentication with 401 Unauthorized

### Requirement: User Registration
The system SHALL automatically register new users on first Telegram authentication.

#### Scenario: First-time user
- **WHEN** user with new telegram_id authenticates
- **THEN** create user record with Telegram profile data and 1000 starting points

#### Scenario: Returning user
- **WHEN** user with existing telegram_id authenticates
- **THEN** update last login and return existing user data

#### Scenario: Profile sync
- **WHEN** user authenticates with updated Telegram profile
- **THEN** sync username, first_name, last_name, photo_url to database

### Requirement: JWT Session Management
The system SHALL issue JWT tokens for authenticated API access.

#### Scenario: Token issuance
- **WHEN** user successfully authenticates via Telegram
- **THEN** issue JWT token with user ID, expiring in 7 days

#### Scenario: Token validation
- **WHEN** API request includes valid JWT in Authorization header
- **THEN** attach user context and allow access to protected endpoints

#### Scenario: Expired token
- **WHEN** API request includes expired JWT
- **THEN** return 401 Unauthorized with "token_expired" error code

#### Scenario: Invalid token
- **WHEN** API request includes malformed or tampered JWT
- **THEN** return 401 Unauthorized with "invalid_token" error code

### Requirement: Authentication Middleware
The system SHALL protect API routes requiring authentication.

#### Scenario: Protected route with valid auth
- **WHEN** request to protected endpoint includes valid JWT
- **THEN** proceed to route handler with user context

#### Scenario: Protected route without auth
- **WHEN** request to protected endpoint lacks Authorization header
- **THEN** return 401 Unauthorized

#### Scenario: Public route
- **WHEN** request to public endpoint (e.g., /api/topics)
- **THEN** proceed without authentication requirement

### Requirement: Frontend Auth Flow
The system SHALL authenticate automatically when loaded in Telegram WebApp.

#### Scenario: App initialization
- **WHEN** app loads in Telegram WebApp context
- **THEN** automatically obtain initData and authenticate with backend

#### Scenario: Token persistence
- **WHEN** user is authenticated
- **THEN** store JWT for subsequent API requests during session

#### Scenario: Non-Telegram context
- **WHEN** app loads outside Telegram (development)
- **THEN** provide mock authentication or demo mode
