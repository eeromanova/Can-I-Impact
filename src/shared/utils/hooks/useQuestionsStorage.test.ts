import { renderHook, act } from '@testing-library/react';
import { useQuestionsStorage } from './useQuestionsStorage';

const STORAGE_KEY = 'answers_v1';

describe('useQuestionsStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('hydrates from sessionStorage', () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ q1: 'a1' }));

    const { result } = renderHook(() => useQuestionsStorage());

    expect(result.current.isHydrated).toBe(true);
    expect(result.current.getAnswer('q1')).toBe('a1');
  });

  test('saveAnswer updates state and sessionStorage', () => {
    const { result } = renderHook(() => useQuestionsStorage());

    act(() => {
      result.current.saveAnswer('q2', 'a2');
    });

    expect(result.current.getAnswer('q2')).toBe('a2');
    expect(sessionStorage.getItem(STORAGE_KEY)).toContain('"q2":"a2"');
  });

  test('clearAnswers clears state and sessionStorage', () => {
    const { result } = renderHook(() => useQuestionsStorage());

    act(() => {
      result.current.saveAnswer('q3', 'a3');
    });

    act(() => {
      result.current.clearAnswers();
    });
    expect(result.current.getAnswers()).toEqual({});
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  test('getAnswer returns empty string for unknown question', () => {
    const { result } = renderHook(() => useQuestionsStorage());
    expect(result.current.getAnswer('unknown')).toBe('');
  });
});
