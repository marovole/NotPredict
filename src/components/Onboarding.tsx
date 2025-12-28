'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [practiceComplete, setPracticeComplete] = useState(false);

  const steps = [
    {
      title: '欢迎来到 NotPredict',
      description: '用滑动的方式预测未来！向右滑表示"会发生"，向左滑表示"不会发生"。',
      showGift: true,
    },
    {
      title: '试试看！',
      description: '滑动下面的练习卡片',
      showPractice: true,
    },
    {
      title: '太棒了！',
      description: '你已经掌握了基本操作。开始你的预测之旅吧！',
      showComplete: true,
    },
  ];

  const handlePracticeSwipe = () => {
    setPracticeComplete(true);
    setTimeout(() => setStep(2), 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-sm text-center"
        >
          {steps[step].showGift && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Gift className="w-12 h-12 text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold"
              >
                🎁 新手礼包 1000 积分
              </motion.div>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h2>
          <p className="text-slate-400 mb-8">{steps[step].description}</p>

          {steps[step].showPractice && !practiceComplete && (
            <div className="relative h-48 mb-8">
              <PracticeCard onSwipe={handlePracticeSwipe} />
            </div>
          )}

          {steps[step].showPractice && practiceComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 mx-auto bg-emerald-500 rounded-full flex items-center justify-center mb-8"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
          )}

          {steps[step].showComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 mx-auto text-yellow-400" />
            </motion.div>
          )}

          {step === 0 && (
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity"
            >
              开始教程
            </button>
          )}

          {step === 2 && (
            <button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity"
            >
              开始预测
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === step ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PracticeCard({ onSwipe }: { onSwipe: (dir: 'left' | 'right') => void }) {
  const [dragX, setDragX] = useState(0);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={(_, info) => setDragX(info.offset.x)}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onSwipe(info.offset.x > 0 ? 'right' : 'left');
        }
        setDragX(0);
      }}
      style={{ x: dragX }}
      className="absolute inset-0 mx-auto w-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6 cursor-grab active:cursor-grabbing"
    >
      <div className="text-center">
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-lg font-bold text-white mb-2">练习卡片</h3>
        <p className="text-sm text-slate-400">向任意方向滑动</p>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> NO
        </span>
        <span className="flex items-center gap-1">
          YES <ArrowRight className="w-3 h-3" />
        </span>
      </div>

      {Math.abs(dragX) > 50 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute top-4 ${dragX > 0 ? 'right-4' : 'left-4'} px-3 py-1 rounded-full font-bold text-sm ${
            dragX > 0 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}
        >
          {dragX > 0 ? 'YES!' : 'NO!'}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Onboarding;
