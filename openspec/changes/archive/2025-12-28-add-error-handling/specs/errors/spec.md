## ADDED Requirements

### Requirement: React Error Boundaries
The system SHALL catch and handle React component errors gracefully.

#### Scenario: Component error
- **WHEN** React component throws error
- **THEN** display fallback UI instead of crashing app

#### Scenario: Error recovery
- **WHEN** user clicks retry in error boundary
- **THEN** attempt to re-render failed component

### Requirement: API Error Responses
The system SHALL return consistent error responses from all API endpoints.

#### Scenario: Error response format
- **WHEN** API returns error
- **THEN** use format: `{ success: false, error: { code, message, details? } }`

### Requirement: User-Friendly Error States
The system SHALL display helpful error messages to users.

#### Scenario: Network error
- **WHEN** API request fails due to network
- **THEN** show "连接失败" with retry button
