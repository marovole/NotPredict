import { useGameStore } from '@/lib/store';

describe('Game Store', () => {
  beforeEach(() => {
    useGameStore.setState({
      points: 1000,
      streak: 0,
      bets: [],
      hasSeenTutorial: false,
    });
  });

  describe('addPoints', () => {
    it('should add points to balance', () => {
      const store = useGameStore.getState();
      store.addPoints(500);
      expect(useGameStore.getState().points).toBe(1500);
    });

    it('should not add negative points', () => {
      const store = useGameStore.getState();
      store.addPoints(-100);
      expect(useGameStore.getState().points).toBe(1000);
    });

    it('should not add zero points', () => {
      const store = useGameStore.getState();
      store.addPoints(0);
      expect(useGameStore.getState().points).toBe(1000);
    });

    it('should not add non-finite numbers', () => {
      const store = useGameStore.getState();
      store.addPoints(Infinity);
      expect(useGameStore.getState().points).toBe(1000);
    });
  });

  describe('deductPoints', () => {
    it('should deduct points from balance', () => {
      const store = useGameStore.getState();
      store.deductPoints(300);
      expect(useGameStore.getState().points).toBe(700);
    });

    it('should not go below zero', () => {
      const store = useGameStore.getState();
      store.deductPoints(2000);
      expect(useGameStore.getState().points).toBe(0);
    });

    it('should not deduct negative points', () => {
      const store = useGameStore.getState();
      store.deductPoints(-100);
      expect(useGameStore.getState().points).toBe(1000);
    });
  });

  describe('streak', () => {
    it('should increment streak', () => {
      const store = useGameStore.getState();
      store.incrementStreak();
      store.incrementStreak();
      expect(useGameStore.getState().streak).toBe(2);
    });

    it('should reset streak to zero', () => {
      useGameStore.setState({ streak: 5 });
      const store = useGameStore.getState();
      store.resetStreak();
      expect(useGameStore.getState().streak).toBe(0);
    });
  });

  describe('placeBet', () => {
    it('should add a bet to the list', () => {
      const store = useGameStore.getState();
      store.placeBet('topic-123', 'right');
      
      const bets = useGameStore.getState().bets;
      expect(bets).toHaveLength(1);
      expect(bets[0].topicId).toBe('topic-123');
      expect(bets[0].direction).toBe('right');
    });

    it('should not add bet with invalid direction', () => {
      const store = useGameStore.getState();
      store.placeBet('topic-123', 'up' as 'left' | 'right');
      expect(useGameStore.getState().bets).toHaveLength(0);
    });

    it('should not add bet with invalid topicId', () => {
      const store = useGameStore.getState();
      store.placeBet('', 'right');
      expect(useGameStore.getState().bets).toHaveLength(0);
    });
  });

  describe('setTutorialSeen', () => {
    it('should mark tutorial as seen', () => {
      const store = useGameStore.getState();
      expect(useGameStore.getState().hasSeenTutorial).toBe(false);
      store.setTutorialSeen();
      expect(useGameStore.getState().hasSeenTutorial).toBe(true);
    });
  });
});
