import { EntryCard } from '../components/history/EntryCard';
import { HistorySkeleton } from '../components/history/HistorySkeleton';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { FetchErrorNotice } from '../components/status/FetchErrorNotice';
import { useLanguage } from '../i18n/LanguageContext';
import type { ConnectionStatus, DateGroup, FetchStatus } from '../types';

interface HistoryPageProps {
  groupedByDate: DateGroup[];
  fetchStatus: FetchStatus;
  connectionStatus: ConnectionStatus;
  onRetry: () => void;
}

export const HistoryPage = ({ groupedByDate, fetchStatus, connectionStatus, onRetry }: HistoryPageProps) => {
  const { dict } = useLanguage();

  return (
    <div className="screen">
      <ScreenHeader title={dict.history.screenTitle} connectionStatus={connectionStatus} />

      {fetchStatus === 'loading' && <HistorySkeleton />}
      {fetchStatus === 'error' && <FetchErrorNotice onRetry={onRetry} />}

      {fetchStatus !== 'loading' &&
        (groupedByDate.length === 0 ? (
          <div className="empty-state">
            {dict.history.emptyTitle}
            <br />
            {dict.history.emptySubtitle}
          </div>
        ) : (
          groupedByDate.map((group) => (
            <div key={group.label} className="history-group">
              <div className="label-sm">{group.label}</div>
              {group.items.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ))
        ))}
    </div>
  );
};
