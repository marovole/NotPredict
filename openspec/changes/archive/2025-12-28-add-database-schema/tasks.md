# Tasks: Add Database Schema

## 1. Setup
- [x] 1.1 Install Prisma and dependencies (`npm install prisma @prisma/client`)
- [x] 1.2 Initialize Prisma (`npx prisma init`)
- [x] 1.3 Configure Supabase PostgreSQL connection string
- [x] 1.4 Create `.env.example` template

## 2. Schema Design
- [x] 2.1 Define User model (telegram_id, username, points, streak, etc.)
- [x] 2.2 Define Topic model (title, description, pools, status, dates)
- [x] 2.3 Define Bet model (user, topic, direction, amount, timestamp)
- [x] 2.4 Define Transaction model (user, type, amount, balance, timestamp)
- [x] 2.5 Define DailyReward model (user, date, amount, type)
- [x] 2.6 Add indexes for performance-critical queries
- [x] 2.7 Add proper relations and foreign keys

## 3. Database Client
- [x] 3.1 Create Prisma client singleton (`src/lib/db.ts`)
- [x] 3.2 Configure connection pooling for serverless

## 4. Migrations
- [x] 4.1 Generate initial migration
- [x] 4.2 Apply migration to development database
- [x] 4.3 Seed database with sample data for testing

## 5. Validation
- [x] 5.1 Verify Prisma client generation
- [x] 5.2 Test database connectivity
- [x] 5.3 Run type checking with new models
