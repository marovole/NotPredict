## ADDED Requirements

### Requirement: Rate Limiting
The system SHALL limit API request rates to prevent abuse.

#### Scenario: Within rate limit
- **WHEN** user makes requests within allowed rate
- **THEN** process requests normally

#### Scenario: Rate limit exceeded
- **WHEN** user exceeds rate limit
- **THEN** return 429 Too Many Requests with retry-after header

### Requirement: Input Validation
The system SHALL validate all API inputs before processing.

#### Scenario: Valid input
- **WHEN** request matches Zod schema
- **THEN** proceed with handler

#### Scenario: Invalid input
- **WHEN** request fails validation
- **THEN** return 400 with validation error details

### Requirement: Security Headers
The system SHALL include security headers in all responses.

#### Scenario: CSP header
- **WHEN** response is sent
- **THEN** include Content-Security-Policy header restricting sources
