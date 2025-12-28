import { z } from 'zod';

export const placeBetSchema = z.object({
  topicId: z.string().min(1),
  direction: z.enum(['YES', 'NO']),
  amount: z.number().int().positive().max(10000).default(100),
});

export const createTopicSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(20).max(1000),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).max(5).default([]),
  endsAt: z.string().datetime(),
});

export const settleTopicSchema = z.object({
  outcome: z.enum(['YES', 'NO', 'CANCELLED']),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type PlaceBetInput = z.infer<typeof placeBetSchema>;
export type CreateTopicInput = z.infer<typeof createTopicSchema>;
export type SettleTopicInput = z.infer<typeof settleTopicSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
