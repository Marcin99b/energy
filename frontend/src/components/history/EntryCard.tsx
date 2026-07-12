import { Card } from '../ui/Card';
import { formatTime } from '../../utils/format';
import { IMPACT_ARROWS } from '../../utils/impact';
import { useLanguage } from '../../i18n/LanguageContext';
import type { EnergyEntry } from '../../types';

const energyTier = (energy: number): 'low' | 'mid' | 'high' => {
  if (energy <= 3) return 'low';
  if (energy <= 6) return 'mid';
  return 'high';
};

interface EntryCardProps {
  entry: EnergyEntry;
}

export const EntryCard = ({ entry }: EntryCardProps) => {
  const { dict } = useLanguage();
  const timeAndContext = entry.context ? `${formatTime(entry.ts)} · ${entry.context}` : formatTime(entry.ts);
  const impactLabel = entry.impact === 'increase' ? dict.history.impactIncrease : dict.history.impactDecrease;

  return (
    <Card className="entry-card">
      <div className="entry-header">
        <div className={`entry-avatar entry-avatar--${energyTier(entry.energy)}`}>{entry.energy}</div>
        <div className="entry-body">
          <div className="entry-activity">{entry.activity}</div>
          <div className="entry-meta">{timeAndContext}</div>
        </div>
        <div className={`entry-impact entry-impact--${entry.impact}`}>
          {IMPACT_ARROWS[entry.impact]} {impactLabel}
        </div>
      </div>
      {entry.note && <div className="entry-note">{entry.note}</div>}
    </Card>
  );
};
