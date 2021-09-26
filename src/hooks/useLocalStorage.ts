import { useCallback } from 'react';

export function useLocalStorage(suffix = '@navi') {
  const setItem = useCallback((name: string, data: object) => {
    localStorage.setItem(`${name}${suffix}`, JSON.stringify(data));
  }, []);

  const getItem = useCallback((name: string) => {
    const data = localStorage.getItem(`${name}${suffix}`);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }, []);

  const clearItems = useCallback(() => {
    localStorage.clear();
  }, []);

  return { setItem, getItem, clearItems };
}
