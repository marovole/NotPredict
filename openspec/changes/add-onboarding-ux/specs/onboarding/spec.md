## ADDED Requirements

### Requirement: New User Detection
The system SHALL detect first-time users and trigger onboarding.

#### Scenario: First app launch
- **WHEN** user opens app without hasSeenTutorial flag
- **THEN** display onboarding flow instead of main content

#### Scenario: Returning user
- **WHEN** user opens app with hasSeenTutorial = true
- **THEN** show main app content directly

### Requirement: Tutorial Flow
The system SHALL guide new users through swipe mechanics.

#### Scenario: Practice swipe
- **WHEN** user is in tutorial mode
- **THEN** show practice card with swipe instructions overlay

#### Scenario: Successful practice
- **WHEN** user completes practice swipe
- **THEN** show celebration animation and proceed to completion

### Requirement: Welcome Bonus
The system SHALL award bonus points upon tutorial completion.

#### Scenario: Complete tutorial
- **WHEN** user finishes onboarding flow
- **THEN** award 500 welcome bonus points and set hasSeenTutorial flag
