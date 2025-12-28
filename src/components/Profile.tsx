'use client';

import { useMemo } from 'react';
import { Settings, History, Wallet, Share2 } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { MOCK_TOPICS } from '@/lib/data';

function formatDate(timestamp: number): string {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleDateString();
  } catch {
    return 'Unknown date';
  }
}

function getTopicTitle(topicId: string): string {
  const topic = MOCK_TOPICS.find(t => t.id === topicId);
  return topic?.title ?? `Topic #${topicId}`;
}

export function Profile() {
  const { points, streak, bets } = useGameStore();
  
  const recentBets = useMemo(() => {
    return bets.slice(-5).reverse();
  }, [bets]);

  return (
    <div className="w-full max-w-sm h-full flex flex-col p-4 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        <button className="p-2 rounded-full hover:bg-slate-800 text-slate-400">
            <Settings size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl shadow-xl shadow-emerald-900/20 mb-4 border-4 border-slate-900">
            👤
        </div>
        <h3 className="text-xl font-bold text-white">Player #8492</h3>
        <p className="text-slate-400 text-sm">Joined Dec 2025</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Wallet size={16} />
                <span className="text-xs font-bold uppercase">Balance</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400">{points.toLocaleString()} pts</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
                <History size={16} />
                <span className="text-xs font-bold uppercase">Total Bets</span>
            </div>
            <div className="text-2xl font-bold text-white">{bets.length}</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4 mb-8 flex items-center justify-between">
        <div>
            <div className="text-orange-400 font-bold text-sm mb-1">Current Streak</div>
            <div className="text-3xl font-bold text-white">{streak} 🔥</div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Share2 size={16} />
            Flex
        </button>
      </div>

      <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentBets.length === 0 ? (
            <div className="text-center text-slate-500 py-8">No bets placed yet</div>
        ) : (
            recentBets.map((bet) => (
                <div key={`${bet.topicId}-${bet.timestamp}`} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 rounded-full ${bet.direction === 'right' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <div>
                            <div className="text-sm text-white font-medium line-clamp-1">{getTopicTitle(bet.topicId)}</div>
                            <div className="text-xs text-slate-500">{formatDate(bet.timestamp)}</div>
                        </div>
                    </div>
                    <div className={`font-bold ${bet.direction === 'right' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {bet.direction === 'right' ? 'YES' : 'NO'}
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
