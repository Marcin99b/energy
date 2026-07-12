import { useEffect, useState } from 'react';

export const useToast = (durationMs = 1800) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs]);

  return { message, showToast: setMessage };
};
