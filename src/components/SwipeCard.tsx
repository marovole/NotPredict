'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Topic, SwipeDirection } from '@/lib/types';
import { clsx } from 'clsx';
import { TrendingUp, Users } from 'lucide-react';

interface SwipeCardProps {
  topic: Topic;
  onSwipe: (direction: SwipeDirection) => void;
  index: number;
}

export function SwipeCard({ topic, onSwipe, index }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  
  const yesOpacity = useTransform(x, [20, 100], [0, 1]);
  const noOpacity = useTransform(x, [-100, -20], [1, 0]);

  const triggerHaptic = useCallback(async (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'selection' | 'success' | 'warning' | 'error') => {
    if (typeof window === 'undefined') return;
    
    try {
        const WebApp = (await import('@twa-dev/sdk')).default;
        
        if (style === 'selection') {
            WebApp.HapticFeedback.selectionChanged();
        } else if (style === 'success' || style === 'warning' || style === 'error') {
            WebApp.HapticFeedback.notificationOccurred(style);
        } else {
            WebApp.HapticFeedback.impactOccurred(style);
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.debug('[SwipeCard] Haptic feedback unavailable:', error);
        }
    }
  }, []);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitDirection('right');
      triggerHaptic('success');
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      setExitDirection('left');
      triggerHaptic('error');
      onSwipe('left');
    }
  }, [onSwipe, triggerHaptic]);

  const handleDrag = useCallback((_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) % 50 < 5 && Math.abs(info.offset.x) > 20) {
      triggerHaptic('selection');
    }
  }, [triggerHaptic]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (index !== 0) return;
    
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      setExitDirection('right');
      triggerHaptic('success');
      onSwipe('right');
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      setExitDirection('left');
      triggerHaptic('error');
      onSwipe('left');
    }
  }, [index, onSwipe, triggerHaptic]);

  const isFront = index === 0;

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        zIndex: 100 - index,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      tabIndex={isFront ? 0 : -1}
      role="button"
      aria-label={`${topic.title}. Press right arrow or enter to predict YES, left arrow or backspace to predict NO`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1 - index * 0.05, 
        y: index * 10,
        opacity: 1 - index * 0.1 
      }}
      exit={{ 
        x: exitDirection === 'left' ? -200 : 200, 
        opacity: 0,
        transition: { duration: 0.2 } 
      }}
      className={clsx(
        "absolute w-full h-[600px] max-w-sm bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 touch-none outline-none focus:ring-2 focus:ring-emerald-400",
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
    >
      <motion.div 
        style={{ opacity: yesOpacity }}
        className="absolute top-8 left-8 border-4 border-brand-green text-brand-green font-bold text-4xl px-4 py-2 rounded-lg transform -rotate-12 z-50 bg-black/20"
      >
        YES
      </motion.div>

      <motion.div 
        style={{ opacity: noOpacity }}
        className="absolute top-8 right-8 border-4 border-brand-red text-brand-red font-bold text-4xl px-4 py-2 rounded-lg transform rotate-12 z-50 bg-black/20"
      >
        NO
      </motion.div>

      <div className="h-2/3 w-full bg-slate-900 relative">
        {topic.imageUrl ? (
            <Image 
              src={topic.imageUrl} 
              alt={topic.title} 
              fill
              className="object-cover"
              sizes="(max-width: 384px) 100vw, 384px"
              priority={index === 0}
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
                <span className="text-6xl">?</span>
            </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800 to-transparent" />
      </div>

      <div className="p-6 h-1/3 flex flex-col justify-between">
        <div>
          <div className="flex gap-2 mb-2">
            {topic.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2 py-1 bg-slate-700 rounded-full text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight mb-2">
            {topic.title}
          </h2>
          <p className="text-slate-400 text-sm line-clamp-2">
            {topic.description}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-slate-500 mt-4">
            <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{topic.participants} playing</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp size={16} />
                <span>Pool: {topic.yesPool + topic.noPool}</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
