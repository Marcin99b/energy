export type Impact = 'increase' | 'decrease';

export type TabId = 'add' | 'history' | 'stats';

export type FetchStatus = 'loading' | 'error' | 'success';

export type ConnectionStatus = 'unknown' | 'online' | 'offline';

export interface NewEntryInput {
  energy: number;
  activity: string;
  context: string | null;
  impact: Impact;
  note: string;
}

export interface EnergyEntry extends NewEntryInput {
  id: string;
  ts: number;
}

export interface RankedActivityName {
  name: string;
  count: number;
}

export interface DateGroup {
  label: string;
  items: EnergyEntry[];
}

export interface ContextBreakdown {
  label: string;
  count: number;
  dominant: 'increase' | 'decrease' | 'mixed';
}

export interface ActivityStat {
  name: string;
  count: number;
  avg: string;
  incPct: number;
  decPct: number;
  inc: number;
  dec: number;
  contextBreakdown: ContextBreakdown[];
}
