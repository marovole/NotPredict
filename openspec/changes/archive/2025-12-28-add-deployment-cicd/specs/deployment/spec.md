## ADDED Requirements

### Requirement: Continuous Integration
The system SHALL run automated checks on every code change.

#### Scenario: PR checks
- **WHEN** pull request is opened
- **THEN** run lint, typecheck, and tests automatically

#### Scenario: Check failure
- **WHEN** any CI check fails
- **THEN** block PR merge until fixed

### Requirement: Continuous Deployment
The system SHALL deploy automatically on merge to main.

#### Scenario: Production deploy
- **WHEN** code is merged to main
- **THEN** deploy to production after CI passes

#### Scenario: Preview deploy
- **WHEN** PR is opened
- **THEN** create preview deployment for testing

### Requirement: Environment Configuration
The system SHALL manage environment-specific configuration.

#### Scenario: Environment variables
- **WHEN** deploying to any environment
- **THEN** use environment-specific variables from Vercel

### Requirement: Database Migrations
The system SHALL apply database migrations during deployment.

#### Scenario: Migration on deploy
- **WHEN** deployment runs
- **THEN** apply pending Prisma migrations
