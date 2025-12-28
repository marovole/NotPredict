# Design: Database Schema

## Context
NotPredict requires persistent storage for a multi-user prediction market. The database must support:
- User accounts linked to Telegram identities
- Prediction topics with betting pools
- Individual bet records for settlement
- Transaction history for auditing
- Daily rewards tracking

## Goals / Non-Goals
- **Goals**:
  - Relational integrity between users, topics, and bets
  - Efficient queries for leaderboards and history
  - Support for pari-mutuel settlement calculations
  - Audit trail for all point movements
- **Non-Goals**:
  - Real-time subscriptions (handled separately)
  - Sharding or horizontal scaling (premature)
  - Blockchain integration (future Q3)

## Decisions

### Database Choice: PostgreSQL via Supabase
- **Why**: Managed PostgreSQL with built-in auth, real-time, and edge functions
- **Alternatives**: 
  - PlanetScale (MySQL) - Less Prisma ecosystem support
  - MongoDB - Overkill for relational data model
  - SQLite - Not suitable for production multi-user

### ORM Choice: Prisma
- **Why**: Type-safe queries, excellent DX, migration support
- **Alternatives**:
  - Drizzle - Less mature, smaller ecosystem
  - Kysely - Lower-level, more boilerplate
  - Raw SQL - Error-prone, no type safety

### Schema Design

```prisma
model User {
  id            String        @id @default(cuid())
  telegramId    BigInt        @unique
  username      String?
  firstName     String?
  lastName      String?
  photoUrl      String?
  points        Int           @default(1000)
  streak        Int           @default(0)
  maxStreak     Int           @default(0)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  bets          Bet[]
  transactions  Transaction[]
  dailyRewards  DailyReward[]
  
  @@index([telegramId])
  @@index([points(sort: Desc)])
}

model Topic {
  id            String      @id @default(cuid())
  title         String
  description   String
  imageUrl      String?
  yesPool       Int         @default(0)
  noPool        Int         @default(0)
  participants  Int         @default(0)
  status        TopicStatus @default(ACTIVE)
  outcome       Outcome?
  tags          String[]
  endsAt        DateTime
  settledAt     DateTime?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  bets          Bet[]
  
  @@index([status, endsAt])
  @@index([createdAt(sort: Desc)])
}

model Bet {
  id            String         @id @default(cuid())
  userId        String
  topicId       String
  direction     BetDirection
  amount        Int
  settled       Boolean        @default(false)
  won           Boolean?
  payout        Int?
  createdAt     DateTime       @default(now())
  
  user          User           @relation(fields: [userId], references: [id])
  topic         Topic          @relation(fields: [topicId], references: [id])
  
  @@unique([userId, topicId])
  @@index([userId, createdAt(sort: Desc)])
  @@index([topicId, settled])
}

model Transaction {
  id            String          @id @default(cuid())
  userId        String
  type          TransactionType
  amount        Int
  balance       Int
  reference     String?
  createdAt     DateTime        @default(now())
  
  user          User            @relation(fields: [userId], references: [id])
  
  @@index([userId, createdAt(sort: Desc)])
}

model DailyReward {
  id            String        @id @default(cuid())
  userId        String
  type          RewardType
  amount        Int
  claimedAt     DateTime      @default(now())
  
  user          User          @relation(fields: [userId], references: [id])
  
  @@unique([userId, claimedAt])
  @@index([userId, claimedAt(sort: Desc)])
}

enum TopicStatus {
  ACTIVE
  ENDED
  SETTLED
  CANCELLED
}

enum Outcome {
  YES
  NO
}

enum BetDirection {
  YES
  NO
}

enum TransactionType {
  BET_PLACED
  BET_WON
  BET_LOST
  DAILY_CHECKIN
  REFERRAL_BONUS
  BANKRUPTCY_RELIEF
  ADMIN_ADJUSTMENT
}

enum RewardType {
  DAILY_CHECKIN
  BANKRUPTCY_RELIEF
  REFERRAL
}
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Supabase vendor lock-in | Standard PostgreSQL, can migrate |
| Connection limits in serverless | Use Prisma connection pooling |
| Schema migrations in production | Use Prisma migrate with CI/CD |

## Migration Plan
1. Set up Supabase project and get connection string
2. Run initial migration in development
3. Seed with test data
4. Apply to production via CI/CD

## Open Questions
- Should we add soft delete for topics/bets?
- Do we need a separate AdminUser model?
