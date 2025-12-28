# Project Context

## Purpose
NotPredict is a gamified prediction market Telegram WebApp that simplifies complex trading into a Tinder-like "swipe-to-bet" interface. Users predict outcomes by swiping right (YES) or left (NO) on topic cards, earning virtual points through a pari-mutuel betting system.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Telegram WebApp SDK
- **Deployment**: Vercel + Supabase
- **Icons**: Lucide React

## Project Conventions

### Code Style
- Use functional components with hooks
- Prefer `const` over `let`, never use `var`
- Use descriptive variable names (no abbreviations)
- File naming: kebab-case for files, PascalCase for components
- Use `@/` path alias for imports from `src/`
- No comments unless explaining complex algorithms
- Empty catch blocks forbidden - always log or handle errors

### Architecture Patterns
- **Frontend**: Component-based architecture with clear separation
  - `src/components/` - Reusable UI components
  - `src/app/` - Next.js App Router pages and layouts
  - `src/lib/` - Utilities, types, store, and data layer
- **Backend**: Next.js API Routes
  - `src/app/api/` - RESTful API endpoints
  - Zod for request/response validation
  - JWT for authentication tokens
- **Database**: Prisma ORM with PostgreSQL
  - `prisma/schema.prisma` - Data models
  - Migrations via `prisma migrate`

### Testing Strategy
- Unit tests: Jest + React Testing Library
- API tests: Jest with supertest
- E2E tests: Playwright
- Minimum coverage: 80%
- Test files: `*.test.ts` or `*.spec.ts`

### Git Workflow
- Branch naming: `feature/`, `fix/`, `refactor/`
- Commit messages: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- PR required for main branch
- CI must pass before merge

## Domain Context

### Core Concepts
- **Topic**: A prediction question with YES/NO outcome (e.g., "Will Bitcoin hit $100k?")
- **Bet**: User's prediction on a topic with points wagered
- **Points**: Virtual currency (not real money) used for betting
- **Pool**: Total points bet on YES or NO for a topic
- **Streak**: Consecutive correct predictions
- **Settlement**: Resolution of a topic with winner payout

### Pari-Mutuel Algorithm
```
Winner Payout = Stake + (Stake / Winner Pool) * Loser Pool
```
The system takes no risk - losers pay winners directly.

### Points Economy
- Daily check-in: 100-500 pts (random)
- Referral bonus: 500 pts (both parties)
- Bankruptcy relief: 500 pts when balance hits zero (once daily)
- Default bet: 100 pts per swipe

## Important Constraints
- **Legal**: Virtual points only, no real money (避开法律风险)
- **Platform**: Must work within Telegram WebApp limitations
- **Mobile-first**: Primary usage is on mobile devices
- **Performance**: Card swipe animations must be 60fps
- **Offline**: Graceful degradation when offline

## External Dependencies
- **Telegram WebApp SDK**: User identity and haptic feedback
- **Telegram Bot API**: Push notifications and callbacks
- **Supabase**: PostgreSQL database and real-time subscriptions
- **Vercel**: Hosting and edge functions
