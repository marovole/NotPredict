'use client';

import { Trophy, TrendingUp, Medal } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_LEADERBOARD = [
  { id: '1', name: 'CryptoKing', points: 15420, streak: 12, avatar: '👑' },
  { id: '2', name: 'MoonWalker', points: 12850, streak: 5, avatar: '🚀' },
  { id: '3', name: 'DiamondHands', points: 11200, streak: 8, avatar: '💎' },
  { id: '4', name: 'SatoshiFan', points: 9800, streak: 3, avatar: '😎' },
  { id: '5', name: 'BearMarket', points: 8500, streak: 0, avatar: '🐻' },
  { id: '6', name: 'You', points: 1250, streak: 2, avatar: '👤', isMe: true },
];

export function Leaderboard() {
  return (
    <div className="w-full max-w-sm h-full flex flex-col p-4 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-400" size={32} />
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold">Weekly Pool</span>
            <span className="text-emerald-400 font-bold text-xl">2.5M pts</span>
        </div>
        <div className="flex-1 bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
            <span className="text-slate-400 text-xs uppercase font-bold">Time Left</span>
            <span className="text-white font-bold text-xl">2d 14h</span>
        </div>
      </div>

      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((user, index) => (
          <div 
            key={user.id}
            className={clsx(
              "flex items-center p-3 rounded-xl border transition-all",
              user.isMe 
                ? "bg-emerald-900/20 border-emerald-500/50" 
                : "bg-slate-800 border-slate-700 hover:bg-slate-750"
            )}
          >
            <div className="w-8 font-bold text-slate-500 text-center">
                {index < 3 ? <Medal size={20} className={
                    index === 0 ? "text-yellow-400" :
                    index === 1 ? "text-slate-300" : "text-amber-600"
                } /> : `#${index + 1}`}
            </div>
            
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                {user.avatar}
            </div>
            
            <div className="flex-1 ml-3">
                <div className="font-bold text-white flex items-center gap-2">
                    {user.name}
                    {user.isMe && <span className="text-xs bg-emerald-500 text-black px-1.5 rounded font-bold">YOU</span>}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                    <TrendingUp size={12} className={user.streak > 3 ? "text-orange-500" : "text-slate-500"} />
                    Streak: {user.streak}
                </div>
            </div>
            
            <div className="font-mono font-bold text-emerald-400">
                {user.points.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
