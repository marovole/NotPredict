# Change: Add Database Schema and Prisma ORM

## Why
The application currently uses localStorage for data persistence, which is inadequate for a production prediction market. We need a proper database to store users, topics, bets, and transactions with data integrity, querying capabilities, and multi-user support.

## What Changes
- Install and configure Prisma ORM with PostgreSQL
- Design and implement database schema for all core entities
- Create database migrations
- Set up Supabase PostgreSQL connection
- Add environment configuration for database URL

## Impact
- Affected specs: database (new capability)
- Affected code: 
  - `prisma/schema.prisma` (new)
  - `src/lib/db.ts` (new)
  - `.env.local` (new)
  - `package.json` (dependencies)
