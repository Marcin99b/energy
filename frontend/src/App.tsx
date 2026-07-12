import { useState } from 'react';
import { useEnergyEntries } from './hooks/useEnergyEntries';
import { AddEntryPage } from './pages/AddEntryPage';
import { HistoryPage } from './pages/HistoryPage';
import { StatsPage } from './pages/StatsPage';
import { TabBar } from './components/layout/TabBar';
import type { TabId } from './types';

export const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>('add');
  const { addEntry, rankedActivityNames, groupedByDate, activityStats, fetchStatus, connectionStatus, retryFetch } =
    useEnergyEntries();

  return (
    <div className="phone">
      {activeTab === 'add' && (
        <AddEntryPage rankedActivityNames={rankedActivityNames} onSubmit={addEntry} connectionStatus={connectionStatus} />
      )}
      {activeTab === 'history' && (
        <HistoryPage
          groupedByDate={groupedByDate}
          fetchStatus={fetchStatus}
          connectionStatus={connectionStatus}
          onRetry={retryFetch}
        />
      )}
      {activeTab === 'stats' && (
        <StatsPage
          activityStats={activityStats}
          fetchStatus={fetchStatus}
          connectionStatus={connectionStatus}
          onRetry={retryFetch}
        />
      )}

      <TabBar activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
};
