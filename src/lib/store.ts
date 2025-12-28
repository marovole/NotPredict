import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SwipeDirection } from './types';

interface Bet {
  topicId: string;
  direction: SwipeDirection;
  timestamp: number;
}

interface GameState {
  points: number;
  streak: number;
  bets: Bet[];
  hasSeenTutorial: boolean;
  
  addPoints: (amount: number) => void;
  deductPoints: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  placeBet: (topicId: string, direction: SwipeDirection) => void;
  setTutorialSeen: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      points: 1250, 
      streak: 0,
      bets: [],
      hasSeenTutorial: false,

      addPoints: (amount) => set((state) => ({ points: state.points + amount })),
      
      deductPoints: (amount) => set((state) => ({ points: Math.max(0, state.points - amount) })),
      
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
      
      resetStreak: () => set({ streak: 0 }),
      
      placeBet: (topicId, direction) => set((state) => ({
        bets: [
          ...state.bets, 
          { topicId, direction, timestamp: Date.now() }
        ]
      })),

      setTutorialSeen: () => set({ hasSeenTutorial: true }),
    }),
    {
      name: 'notpredict-storage',
    }
  )
);
