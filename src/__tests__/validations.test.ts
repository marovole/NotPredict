import { placeBetSchema, createTopicSchema, paginationSchema, settleTopicSchema } from '@/lib/validations/schemas';

describe('Validation Schemas', () => {
  describe('placeBetSchema', () => {
    it('should validate a valid bet', () => {
      const result = placeBetSchema.safeParse({
        topicId: 'topic-123',
        direction: 'YES',
        amount: 100,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid direction', () => {
      const result = placeBetSchema.safeParse({
        topicId: 'topic-123',
        direction: 'MAYBE',
        amount: 100,
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative amount', () => {
      const result = placeBetSchema.safeParse({
        topicId: 'topic-123',
        direction: 'YES',
        amount: -50,
      });
      expect(result.success).toBe(false);
    });

    it('should reject amount over 10000', () => {
      const result = placeBetSchema.safeParse({
        topicId: 'topic-123',
        direction: 'YES',
        amount: 15000,
      });
      expect(result.success).toBe(false);
    });

    it('should use default amount when not provided', () => {
      const result = placeBetSchema.safeParse({
        topicId: 'topic-123',
        direction: 'NO',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.amount).toBe(100);
      }
    });
  });

  describe('createTopicSchema', () => {
    it('should validate a valid topic', () => {
      const result = createTopicSchema.safeParse({
        title: 'Will Bitcoin hit $100k by end of 2025?',
        description: 'Predicting whether Bitcoin will reach the psychological barrier of $100,000 USD.',
        endsAt: '2025-12-31T23:59:59Z',
        tags: ['crypto', 'bitcoin'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject title shorter than 10 chars', () => {
      const result = createTopicSchema.safeParse({
        title: 'Short',
        description: 'This is a valid description that is long enough.',
        endsAt: '2025-12-31T23:59:59Z',
      });
      expect(result.success).toBe(false);
    });

    it('should reject description shorter than 20 chars', () => {
      const result = createTopicSchema.safeParse({
        title: 'This is a valid title',
        description: 'Too short',
        endsAt: '2025-12-31T23:59:59Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('settleTopicSchema', () => {
    it('should accept YES outcome', () => {
      const result = settleTopicSchema.safeParse({ outcome: 'YES' });
      expect(result.success).toBe(true);
    });

    it('should accept NO outcome', () => {
      const result = settleTopicSchema.safeParse({ outcome: 'NO' });
      expect(result.success).toBe(true);
    });

    it('should accept CANCELLED outcome', () => {
      const result = settleTopicSchema.safeParse({ outcome: 'CANCELLED' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid outcome', () => {
      const result = settleTopicSchema.safeParse({ outcome: 'MAYBE' });
      expect(result.success).toBe(false);
    });
  });

  describe('paginationSchema', () => {
    it('should use defaults when not provided', () => {
      const result = paginationSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should parse string numbers', () => {
      const result = paginationSchema.safeParse({ page: '2', limit: '50' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(2);
        expect(result.data.limit).toBe(50);
      }
    });

    it('should reject limit over 100', () => {
      const result = paginationSchema.safeParse({ page: 1, limit: 150 });
      expect(result.success).toBe(false);
    });
  });
});
