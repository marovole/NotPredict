# NotPredict - Gamified Prediction Market

NotPredict creates a "Swipe-to-Bet" experience for prediction markets on Telegram, simplifying complex trading into a Tinder-like interface.

## Core Features (Prototype)
- **Tinder-like UI**: Swipe Right for YES, Left for NO.
- **Framer Motion Animations**: Smooth card gestures and transitions.
- **Dark Mode**: Immersive design with Emerald (YES) and Rose (NO) accents.
- **Telegram WebApp Ready**: Designed for mobile-first integration.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Integration**: Telegram WebApp SDK

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the Swipe Deck.

## Project Structure
- `src/components/SwipeCard.tsx`: The draggable card component.
- `src/components/Deck.tsx`: Manages the stack of cards.
- `src/lib/types.ts`: TypeScript definitions for Topics and Users.
- `src/app/globals.css`: Tailwind theme configuration.
