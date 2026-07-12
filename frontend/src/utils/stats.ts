import type { ActivityStat, ContextBreakdown, EnergyEntry, RankedActivityName } from '../types';

interface ContextAccumulator {
  label: string;
  count: number;
  inc: number;
  dec: number;
}

interface ActivityAccumulator {
  name: string;
  count: number;
  energySum: number;
  inc: number;
  dec: number;
  contexts: Map<string, ContextAccumulator>;
}

export const computeActivityStats = (entries: EnergyEntry[], noContextLabel: string): ActivityStat[] => {
  const byActivity = new Map<string, ActivityAccumulator>();

  for (const entry of entries) {
    if (!byActivity.has(entry.activity)) {
      byActivity.set(entry.activity, { name: entry.activity, count: 0, energySum: 0, inc: 0, dec: 0, contexts: new Map() });
    }
    const stat = byActivity.get(entry.activity)!;
    stat.count += 1;
    stat.energySum += entry.energy;
    entry.impact === 'increase' ? stat.inc++ : stat.dec++;

    const ctxKey = entry.context || noContextLabel;
    if (!stat.contexts.has(ctxKey)) stat.contexts.set(ctxKey, { label: ctxKey, count: 0, inc: 0, dec: 0 });
    const ctx = stat.contexts.get(ctxKey)!;
    ctx.count += 1;
    entry.impact === 'increase' ? ctx.inc++ : ctx.dec++;
  }

  return [...byActivity.values()]
    .sort((a, b) => b.count - a.count)
    .map((stat): ActivityStat => ({
      name: stat.name,
      count: stat.count,
      avg: (stat.energySum / stat.count).toFixed(1),
      incPct: Math.round((stat.inc / stat.count) * 100),
      decPct: Math.round((stat.dec / stat.count) * 100),
      inc: stat.inc,
      dec: stat.dec,
      contextBreakdown: [...stat.contexts.values()]
        .sort((a, b) => b.count - a.count)
        .map((ctx): ContextBreakdown => ({
          label: ctx.label,
          count: ctx.count,
          dominant: ctx.inc === ctx.dec ? 'mixed' : ctx.inc > ctx.dec ? 'increase' : 'decrease'
        }))
    }));
};

export const rankActivityNames = (entries: EnergyEntry[]): RankedActivityName[] => {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    counts.set(entry.activity, (counts.get(entry.activity) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
};
