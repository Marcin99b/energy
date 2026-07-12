import * as Yup from 'yup';
import type { Dictionary } from '../i18n/translations';
import type { Impact } from '../types';

export interface AddEntryFormValues {
  activity: string;
  context: string | null;
  energy: number;
  impact: Impact | null;
  note: string;
}

export const buildAddEntrySchema = (dict: Dictionary) =>
  Yup.object({
    activity: Yup.string().trim().required(dict.addEntryForm.errorNoActivity),
    impact: Yup.string<Impact>().nullable().required(dict.addEntryForm.errorNoImpact),
    energy: Yup.number().required(),
    context: Yup.string().nullable(),
    note: Yup.string()
  });
