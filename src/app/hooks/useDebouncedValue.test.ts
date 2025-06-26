import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

jest.useFakeTimers();

describe('useDebouncedValue', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('test', 500));
    expect(result.current).toBe('test');
  });

  it('should update the debounced value after the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    rerender({ value: 'changed', delay: 300 });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('changed');
  });

  it('should reset timer if value changes before delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'first', delay: 200 },
    });

    rerender({ value: 'second', delay: 200 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: 'third', delay: 200 });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('third');
  });
});
