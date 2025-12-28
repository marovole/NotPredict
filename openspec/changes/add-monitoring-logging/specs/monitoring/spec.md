## ADDED Requirements

### Requirement: Structured Logging
The system SHALL log events in structured JSON format.

#### Scenario: Request logging
- **WHEN** API request is processed
- **THEN** log method, path, status, duration in JSON format

#### Scenario: Business event logging
- **WHEN** significant events occur (bet, settlement)
- **THEN** log event with relevant context

### Requirement: Error Tracking
The system SHALL report errors to Sentry.

#### Scenario: Unhandled error
- **WHEN** unhandled exception occurs
- **THEN** capture and send to Sentry with stack trace

### Requirement: Health Check
The system SHALL expose health check endpoint.

#### Scenario: Healthy system
- **WHEN** GET /api/health is called
- **THEN** return 200 with database status
