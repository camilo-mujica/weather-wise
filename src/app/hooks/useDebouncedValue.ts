import { useState, useEffect } from 'react';

export const useDebouncedValue = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== debouncedValue) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return debouncedValue;
};
