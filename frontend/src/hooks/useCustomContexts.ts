import { useState } from 'react';

export const useCustomContexts = () => {
  const [customContexts, setCustomContexts] = useState<string[]>([]);

  const addCustomContext = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    setCustomContexts((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    return trimmed;
  };

  return { customContexts, addCustomContext };
};
