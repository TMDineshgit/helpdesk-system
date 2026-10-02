import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  it('returns the immediate value right away', () => {
    const { result } = renderHook(() => useDebounce('a', 500));
    expect(result.current).toBe('a');
  });

  it('updates to the new value only after the delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'ab' });
    expect(result.current).toBe('a'); // hasn't updated yet

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('ab'); // now it has
    vi.useRealTimers();
  });
});