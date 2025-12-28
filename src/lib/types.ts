export interface Topic {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  yesPool: number;
  noPool: number;
  participants: number;
  tags: string[];
  endsAt: string;
}

export type SwipeDirection = 'left' | 'right';

export interface User {
  id: string;
  points: number;
  streak: number;
  rank: number;
}
