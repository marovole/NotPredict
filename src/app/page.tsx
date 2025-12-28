'use client';

import { useState, useEffect } from 'react';
import { Deck } from '@/components/Deck';
import { Leaderboard } from '@/components/Leaderboard';
import { Profile } from '@/components/Profile';
import { MOCK_TOPICS } from '@/lib/data';
import { SwipeDirection } from '@/lib/types';
import { useGameStore } from '@/lib/store';
import { Home as HomeIcon, Trophy, User } from 'lucide-react';
import { clsx } from 'clsx';
import dynamic from 'next/dynamic';

const WebAppProvider = dynamic(
    () => import('@/components/WebAppProvider'), 
    { ssr: false }
);

export default function Home() {
  const [view, setView] = useState<'home' | 'rank' | 'profile'>('home');
  const { points, placeBet, streak } = useGameStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSwipe = (id: string, dir: SwipeDirection) => {
    placeBet(id, dir);
  };

  if (!isClient) return null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-brand-black p-4 pb-20 overflow-hidden">
        
      {view === 'home' && (
        <header className="w-full max-w-sm flex justify-between items-center py-4 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent italic">
            NotPredict
            </h1>
            <div className="flex gap-2">
                <div className="bg-slate-800 px-3 py-1 rounded-full text-sm font-bold text-yellow-400 border border-slate-700 flex items-center gap-2">
                    <span>{points.toLocaleString()} pts</span>
                    {streak > 2 && <span className="text-orange-500">🔥 {streak}</span>}
                </div>
            </div>
        </header>
      )}

      <div className="w-full max-w-sm flex-1 relative">
        {view === 'home' && <Deck initialTopics={MOCK_TOPICS} onSwipe={handleSwipe} />}
        {view === 'rank' && <Leaderboard />}
        {view === 'profile' && <Profile />}
      </div>
      
      <nav className="fixed bottom-0 w-full max-w-sm bg-slate-900/90 backdrop-blur-md border-t border-slate-800 p-4 flex justify-around text-slate-500 z-50 safe-area-bottom">
        <button 
            onClick={() => setView('home')}
            className={clsx(
                "flex flex-col items-center gap-1 transition-colors",
                view === 'home' ? "text-emerald-400" : "hover:text-slate-300"
            )}
        >
            <HomeIcon size={24} />
            <span className="text-xs font-medium">Home</span>
        </button>
        <button 
            onClick={() => setView('rank')}
            className={clsx(
                "flex flex-col items-center gap-1 transition-colors",
                view === 'rank' ? "text-emerald-400" : "hover:text-slate-300"
            )}
        >
            <Trophy size={24} />
            <span className="text-xs font-medium">Rank</span>
        </button>
        <button 
            onClick={() => setView('profile')}
            className={clsx(
                "flex flex-col items-center gap-1 transition-colors",
                view === 'profile' ? "text-emerald-400" : "hover:text-slate-300"
            )}
        >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
        </button>
      </nav>
      
      <WebAppProvider />
    </main>
  );
}
