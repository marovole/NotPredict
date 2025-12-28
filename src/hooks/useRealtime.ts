'use client';

import { useEffect, useCallback, useRef } from 'react';
import { Topic } from '@/lib/types';

interface UseRealtimeOptions {
  interval?: number;
  enabled?: boolean;
}

type TopicUpdateCallback = (topics: Topic[]) => void;

export function useRealtimeTopics(
  callback: TopicUpdateCallback,
  options: UseRealtimeOptions = {}
) {
  const { interval = 5000, enabled = true } = options;
  const callbackRef = useRef(callback);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const fetchTopics = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/topics?status=ACTIVE', {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) return;

      const data = await response.json();
      if (data.success && data.data?.topics) {
        callbackRef.current(data.data.topics);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Failed to fetch topics:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    fetchTopics();

    const intervalId = setInterval(fetchTopics, interval);

    return () => {
      clearInterval(intervalId);
      abortControllerRef.current?.abort();
    };
  }, [fetchTopics, interval, enabled]);

  return { refresh: fetchTopics };
}

interface PoolUpdate {
  topicId: string;
  yesPool: number;
  noPool: number;
  participants: number;
}

type PoolUpdateCallback = (update: PoolUpdate) => void;

export function useTopicPoolUpdates(
  topicId: string | null,
  callback: PoolUpdateCallback,
  options: UseRealtimeOptions = {}
) {
  const { interval = 3000, enabled = true } = options;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || !topicId) return;

    const fetchPool = async () => {
      try {
        const response = await fetch(`/api/topics/${topicId}`);
        if (!response.ok) return;

        const data = await response.json();
        if (data.success && data.data) {
          callbackRef.current({
            topicId: data.data.id,
            yesPool: data.data.yesPool,
            noPool: data.data.noPool,
            participants: data.data.participants,
          });
        }
      } catch (error) {
        console.error('Failed to fetch topic pool:', error);
      }
    };

    fetchPool();
    const intervalId = setInterval(fetchPool, interval);

    return () => clearInterval(intervalId);
  }, [topicId, interval, enabled]);
}

export function formatPoolChange(oldValue: number, newValue: number): string {
  const diff = newValue - oldValue;
  if (diff === 0) return '';
  return diff > 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString();
}
