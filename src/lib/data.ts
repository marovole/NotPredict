import { Topic } from './types';

export const MOCK_TOPICS: Topic[] = [
  {
    id: '1',
    title: 'Will Bitcoin hit $100k before 2026?',
    description: 'Analysts are divided as market volatility increases. Key resistance at $95k.',
    yesPool: 50000,
    noPool: 32000,
    participants: 1240,
    tags: ['Crypto', 'Finance'],
    endsAt: '2025-12-31'
  },
  {
    id: '2',
    title: 'Real Madrid to win Champions League?',
    description: 'Mbappe injury raises concerns for the upcoming quarter-finals.',
    yesPool: 12000,
    noPool: 8000,
    participants: 850,
    tags: ['Sports', 'Football'],
    endsAt: '2025-06-01'
  },
  {
    id: '3',
    title: 'Will GTA VI release in Q1 2026?',
    description: 'Rockstar hints at delays in recent earnings call.',
    yesPool: 150000,
    noPool: 20000,
    participants: 5000,
    tags: ['Gaming', 'Tech'],
    endsAt: '2026-03-31'
  }
];
