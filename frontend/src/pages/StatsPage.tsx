import { ActivityStatCard } from '../components/stats/ActivityStatCard';
import { StatsSkeleton } from '../components/stats/StatsSkeleton';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { FetchErrorNotice } from '../components/status/FetchErrorNotice';
import { useLanguage } from '../i18n/LanguageContext';
import type { ActivityStat, ConnectionStatus, FetchStatus } from '../types';

interface StatsPageProps {
  activityStats: ActivityStat[];
  fetchStatus: FetchStatus;
  connectionStatus: ConnectionStatus;
  onRetry: () => void;
}

export const StatsPage = ({ activityStats, fetchStatus, connectionStatus, onRetry }: StatsPageProps) => {
  const { dict } = useLanguage();

  return (
    <div className="screen">
      <ScreenHeader title={dict.stats.screenTitle} connectionStatus={connectionStatus} />

      {fetchStatus === 'loading' && <StatsSkeleton />}
      {fetchStatus === 'error' && <FetchErrorNotice onRetry={onRetry} />}

      {fetchStatus !== 'loading' &&
        (activityStats.length === 0 ? (
          <div className="empty-state">
            {dict.stats.emptyTitle}
            <br />
            {dict.stats.emptySubtitle}
          </div>
        ) : (
          activityStats.map((stat) => <ActivityStatCard key={stat.name} stat={stat} />)
        ))}
    </div>
  );
};
