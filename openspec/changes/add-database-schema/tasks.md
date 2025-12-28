# Tasks: Add Database Schema

## 1. Setup
- [ ] 1.1 Install Prisma and dependencies (`npm install prisma @prisma/client`)
- [ ] 1.2 Initialize Prisma (`npx prisma init`)
- [ ] 1.3 Configure Supabase PostgreSQL connection string
- [ ] 1.4 Create `.env.example` template

## 2. Schema Design
- [ ] 2.1 Define User model (telegram_id, username, points, streak, etc.)
- [ ] 2.2 Define Topic model (title, description, pools, status, dates)
- [ ] 2.3 Define Bet model (user, topic, direction, amount, timestamp)
- [ ] 2.4 Define Transaction model (user, type, amount, balance, timestamp)
- [ ] 2.5 Define DailyReward model (user, date, amount, type)
- [ ] 2.6 Add indexes for performance-critical queries
- [ ] 2.7 Add proper relations and foreign keys

## 3. Database Client
- [ ] 3.1 Create Prisma client singleton (`src/lib/db.ts`)
- [ ] 3.2 Configure connection pooling for serverless

## 4. Migrations
- [ ] 4.1 Generate initial migration
- [ ] 4.2 Apply migration to development database
- [ ] 4.3 Seed database with sample data for testing

## 5. Validation
- [ ] 5.1 Verify Prisma client generation
- [ ] 5.2 Test database connectivity
- [ ] 5.3 Run type checking with new models
