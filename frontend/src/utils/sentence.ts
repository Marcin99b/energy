import type { Impact } from '../types';
import type { Dictionary } from '../i18n/translations';

interface EntryDraft {
  context: string | null;
  activity: string;
  energy: number;
  impact: Impact | null;
}

interface NoteSentenceInput {
  draft: EntryDraft;
  sentenceDict: Dictionary['sentence'];
}

export const buildNoteSentence = ({ draft, sentenceDict }: NoteSentenceInput): string => {
  const { context, activity, energy, impact } = draft;
  if (!activity || !impact) return '';

  const eventPart = context ? `${context}: ${activity}` : activity;
  const direction = impact === 'increase' ? sentenceDict.more : sentenceDict.less;

  return `${eventPart}. ${sentenceDict.energyLevelLabel}: ${energy}/10 — ${direction} ${sentenceDict.thanBefore}.`;
};
