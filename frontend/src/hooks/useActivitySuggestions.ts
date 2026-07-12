import { useMemo } from 'react';
import type { RankedActivityName } from '../types';

export const useActivitySuggestions = (
  activity: string,
  rankedActivityNames: RankedActivityName[]
): RankedActivityName[] => {
  return useMemo(() => {
    if (!activity) return [];
    const query = activity.toLowerCase();
    return rankedActivityNames
      .filter(({ name }) => name.toLowerCase() !== query && name.toLowerCase().includes(query))
      .slice(0, 4);
  }, [activity, rankedActivityNames]);
};
