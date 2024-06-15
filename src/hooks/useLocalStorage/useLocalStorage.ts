import { useCallback, useEffect, useState } from 'react';

type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): [T, (value: T) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    initializeWithValue = true,
  } = options;

  const readValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [deserializer, initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        const valueToStore = serializer(value);
        window.localStorage.setItem(key, valueToStore);
        setStoredValue(value);
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [initialValue, key]);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}
