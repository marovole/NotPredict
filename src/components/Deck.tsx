'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Topic, SwipeDirection } from '@/lib/types';
import { SwipeCard } from './SwipeCard';

interface DeckProps {
  initialTopics: Topic[];
  onSwipe: (topicId: string, direction: SwipeDirection) => void;
}

export function Deck({ initialTopics, onSwipe }: DeckProps) {
  const [topics, setTopics] = useState(initialTopics);

  const handleSwipe = (direction: SwipeDirection) => {
    if (topics.length === 0) return;
    
    const currentTopic = topics[0];
    onSwipe(currentTopic.id, direction);
    
    setTopics(prev => prev.slice(1));
  };

  if (topics.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[600px] w-full max-w-sm text-slate-500 gap-4">
            <div className="text-xl font-medium">No more predictions</div>
            <p className="text-sm text-slate-600">Check back later for new topics</p>
        </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center">
      <AnimatePresence>
        {topics.slice(0, 3).map((topic, index) => (
          <SwipeCard 
            key={topic.id} 
            topic={topic} 
            index={index} 
            onSwipe={handleSwipe} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
