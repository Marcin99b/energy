import { useEffect, useState } from 'react';
import type { ConnectionStatus } from '../types';

interface AsyncResultLike {
  isSuccess: boolean;
  isError: boolean;
}

export const useConnectionStatus = (queryResult: AsyncResultLike, mutationResult: AsyncResultLike): ConnectionStatus => {
  const [status, setStatus] = useState<ConnectionStatus>('unknown');

  useEffect(() => {
    if (queryResult.isSuccess) setStatus('online');
    else if (queryResult.isError) setStatus('offline');
  }, [queryResult.isSuccess, queryResult.isError]);

  useEffect(() => {
    if (mutationResult.isSuccess) setStatus('online');
    else if (mutationResult.isError) setStatus('offline');
  }, [mutationResult.isSuccess, mutationResult.isError]);

  return status;
};
