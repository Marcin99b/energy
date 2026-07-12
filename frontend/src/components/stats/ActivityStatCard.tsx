import { Card } from '../ui/Card';
import { DOMINANT_ARROWS } from '../../utils/impact';
import { useLanguage } from '../../i18n/LanguageContext';
import type { ActivityStat, ContextBreakdown } from '../../types';
import type { Dictionary } from '../../i18n/translations';

const dominantLabel = (dominant: ContextBreakdown['dominant'], statsDict: Dictionary['stats']): string => {
  if (dominant === 'increase') return statsDict.dominantIncrease;
  if (dominant === 'decrease') return statsDict.dominantDecrease;
  return statsDict.dominantMixed;
};

interface ActivityStatCardProps {
  stat: ActivityStat;
}

export const ActivityStatCard = ({ stat }: ActivityStatCardProps) => {
  const { dict } = useLanguage();

  return (
    <Card className="stat-card">
      <div className="stat-header">
        <div className="stat-name">{stat.name}</div>
        <div className="stat-meta">
          {stat.count}× · {dict.stats.avgAbbrev} {stat.avg}/10
        </div>
      </div>

      <div className="stat-bar">
        <div className="stat-bar-inc" style={{ width: `${stat.incPct}%` }} />
        <div className="stat-bar-dec" style={{ width: `${stat.decPct}%` }} />
      </div>

      <div className="stat-summary">
        <div>↑ {stat.inc} {dict.stats.moreEnergy}</div>
        <div>↓ {stat.dec} {dict.stats.lessEnergy}</div>
      </div>

      {stat.contextBreakdown.length > 0 && (
        <>
          <div className="divider divider--spaced" />
          <div className="stat-context-title">{dict.stats.byContext}</div>
          {stat.contextBreakdown.map((ctx) => (
            <div key={ctx.label} className="stat-context-row">
              <div className="stat-context-label">
                {ctx.label} <span className="stat-context-count">· {ctx.count}×</span>
              </div>
              <div className={`stat-context-dominant stat-context-dominant--${ctx.dominant}`}>
                {DOMINANT_ARROWS[ctx.dominant]} {dominantLabel(ctx.dominant, dict.stats)}
              </div>
            </div>
          ))}
        </>
      )}
    </Card>
  );
};
