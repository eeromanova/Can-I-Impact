'use client';

import { useCallback, useEffect, useState } from 'react';

type AnswerValue = string | string[];
type AnswerMap = Record<string, AnswerValue>;

const STORAGE_KEY = 'answers_v1';

export const useQuestionsStorage = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>({});

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as AnswerMap;
          setAnswers(parsed || {});
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved answers', e);
      setAnswers({});
    } finally {
      setIsHydrated(true);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const parsed = e.newValue ? (JSON.parse(e.newValue) as AnswerMap) : {};
          setAnswers(parsed || {});
        } catch {}
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const saveAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save answers', e);
      }
      return next;
    });
  }, []);

  const getAnswers = useCallback(() => answers, [answers]);

  const getAnswer = useCallback(
    (questionId: string) => {
      const a = answers[questionId];
      return typeof a === 'undefined' ? '' : a;
    },
    [answers]
  );

  const clearAnswers = useCallback(() => {
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear answers', e);
    }
  }, []);

  return {
    answers,
    getAnswers,
    saveAnswer,
    getAnswer,
    clearAnswers,
    isHydrated,
  };
};
