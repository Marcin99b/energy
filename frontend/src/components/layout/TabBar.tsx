import { useLanguage } from '../../i18n/LanguageContext';
import type { TabId } from '../../types';

interface Tab {
  id: TabId;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'add', icon: '✎' },
  { id: 'history', icon: '☰' },
  { id: 'stats', icon: '◔' }
];

interface TabBarProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export const TabBar = ({ activeTab, onChange }: TabBarProps) => {
  const { dict } = useLanguage();
  const labels: Record<TabId, string> = {
    add: dict.tabBar.add,
    history: dict.tabBar.history,
    stats: dict.tabBar.stats
  };

  return (
    <nav className="tab-bar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-btn ${tab.id === activeTab ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <div className="icon">{tab.icon}</div>
          <div className="label">{labels[tab.id]}</div>
        </button>
      ))}
    </nav>
  );
};
