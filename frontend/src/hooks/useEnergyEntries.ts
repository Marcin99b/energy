import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { computeActivityStats, rankActivityNames } from '../utils/stats';
import { groupEntriesByDate } from '../utils/format';
import { useLanguage } from '../i18n/LanguageContext';
import { useConnectionStatus } from './useConnectionStatus';
import { energyEntriesApi } from '../api/energyEntriesApi';
import type { EnergyEntry, FetchStatus, NewEntryInput } from '../types';

const ENERGY_ENTRIES_QUERY_KEY = ['energy-entries'];

export const useEnergyEntries = () => {
  const { language, dict } = useLanguage();
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ENERGY_ENTRIES_QUERY_KEY,
    queryFn: energyEntriesApi.list,
    retry: false
  });

  const createMutation = useMutation({
    mutationFn: ({ id, entry }: { id: string; entry: NewEntryInput }) => energyEntriesApi.create(id, entry),
    onMutate: ({ id, entry }) => {
      const optimisticEntry: EnergyEntry = { id, ts: Date.now(), ...entry };
      queryClient.setQueryData<EnergyEntry[]>(ENERGY_ENTRIES_QUERY_KEY, (prev) => [optimisticEntry, ...(prev ?? [])]);
    }
  });

  const connectionStatus = useConnectionStatus(listQuery, createMutation);
  const entries = useMemo(() => listQuery.data ?? [], [listQuery.data]);

  const addEntry = async (entry: NewEntryInput) => {
    // Local-first: the optimistic entry (added in onMutate) is never rolled back,
    // so a failed sync only needs to flip the connection badge, not surface an error.
    await createMutation.mutateAsync({ id: crypto.randomUUID(), entry }).catch(() => {});
  };

  const dateLabels = { today: dict.history.today, yesterday: dict.history.yesterday };
  const rankedActivityNames = useMemo(() => rankActivityNames(entries), [entries]);
  const groupedByDate = useMemo(
    () => groupEntriesByDate(entries, language, dateLabels),
    [entries, language, dateLabels.today, dateLabels.yesterday]
  );
  const activityStats = useMemo(
    () => computeActivityStats(entries, dict.stats.noContext),
    [entries, dict.stats.noContext]
  );

  const fetchStatus: FetchStatus = listQuery.isPending ? 'loading' : listQuery.isError ? 'error' : 'success';

  return {
    addEntry,
    rankedActivityNames,
    groupedByDate,
    activityStats,
    fetchStatus,
    connectionStatus,
    retryFetch: () => {
      listQuery.refetch();
    }
  };
};
