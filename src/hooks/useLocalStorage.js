import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }

      return initialValue;
    } catch (error) {
      console.error('Failed to read localStorage:', error);

      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    try {
      setValue(newValue);

      localStorage.setItem(
        key,
        JSON.stringify(newValue),
      );
    } catch (error) {
      console.error(
        'Failed to update localStorage:',
        error,
      );
    }
  };

  return [value, updateValue];
}

export default useLocalStorage;