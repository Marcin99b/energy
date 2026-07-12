import type { DateGroup, EnergyEntry } from '../types';
import type { Language } from '../i18n/translations';

const LOCALE: Record<Language, string> = { pl: 'pl-PL', en: 'en-US' };

interface RelativeDateLabels {
  today: string;
  yesterday: string;
}

export const formatTime = (ts: number): string => {
  const d = new Date(ts);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
};

export const formatDateLabel = (ts: number, language: Language, labels: RelativeDateLabels): string => {
  const d = new Date(ts);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return labels.today;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return labels.yesterday;

  return d.toLocaleDateString(LOCALE[language], { day: 'numeric', month: 'long' });
};

export const groupEntriesByDate = (entries: EnergyEntry[], language: Language, labels: RelativeDateLabels): DateGroup[] => {
  const groups: DateGroup[] = [];
  const byLabel: Record<string, DateGroup> = {};

  for (const entry of entries) {
    const label = formatDateLabel(entry.ts, language, labels);
    if (!byLabel[label]) {
      byLabel[label] = { label, items: [] };
      groups.push(byLabel[label]);
    }
    byLabel[label].items.push(entry);
  }

  return groups;
};
