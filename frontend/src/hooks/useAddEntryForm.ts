import { useMemo } from 'react';
import { useFormik } from 'formik';
import { useCustomContexts } from './useCustomContexts';
import { useActivitySuggestions } from './useActivitySuggestions';
import { useToast } from './useToast';
import { useLanguage } from '../i18n/LanguageContext';
import { buildNoteSentence } from '../utils/sentence';
import { buildAddEntrySchema } from '../validation/addEntrySchema';
import type { AddEntryFormValues } from '../validation/addEntrySchema';
import type { ContextPickerProps } from '../components/add-entry/ContextPicker';
import type { ActivityInputProps } from '../components/add-entry/ActivityInput';
import type { EnergyFieldProps } from '../components/add-entry/EnergyPicker';
import type { ImpactFieldProps } from '../components/add-entry/ImpactPicker';
import type { NoteFieldProps } from '../components/add-entry/NoteInput';
import type { Impact, NewEntryInput, RankedActivityName } from '../types';

const INITIAL_VALUES: AddEntryFormValues = { activity: '', context: null, energy: 5, impact: null, note: '' };

const toggleValue = <T,>(current: T | null, value: T): T | null => (current === value ? null : value);

interface UseAddEntryFormArgs {
  rankedActivityNames: RankedActivityName[];
  onSubmit: (entry: NewEntryInput) => Promise<void>;
}

export const useAddEntryForm = ({ rankedActivityNames, onSubmit }: UseAddEntryFormArgs) => {
  const { dict } = useLanguage();
  const { customContexts, addCustomContext } = useCustomContexts();
  const { message: toast, showToast } = useToast();
  const validationSchema = useMemo(() => buildAddEntrySchema(dict), [dict]);

  const formik = useFormik<AddEntryFormValues>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: async (values, helpers) => {
      if (!values.impact) return;
      await onSubmit({
        energy: values.energy,
        activity: values.activity.trim(),
        context: values.context,
        impact: values.impact,
        note: values.note.trim()
      });
      helpers.resetForm({ values: { ...INITIAL_VALUES, energy: values.energy } });
      showToast(dict.addEntryForm.savedToast);
    }
  });

  const contexts = [...Object.values(dict.addEntryForm.contexts), ...customContexts];
  const suggestions = useActivitySuggestions(formik.values.activity, rankedActivityNames);

  const notePreview = buildNoteSentence({
    draft: {
      context: formik.values.context,
      activity: formik.values.activity.trim(),
      energy: formik.values.energy,
      impact: formik.values.impact
    },
    sentenceDict: dict.sentence
  });

  const selectContext = (value: string) => {
    formik.setFieldValue('context', toggleValue(formik.values.context, value));
  };

  const selectAndAddCustomContext = (value: string) => {
    const added = addCustomContext(value);
    if (added) formik.setFieldValue('context', added);
  };

  const selectImpact = (value: Impact) => {
    formik.setFieldValue('impact', toggleValue(formik.values.impact, value));
  };

  const contextField: ContextPickerProps = {
    options: contexts,
    selected: formik.values.context,
    onSelect: selectContext,
    onAddCustom: selectAndAddCustomContext
  };
  const activityField: ActivityInputProps = {
    value: formik.values.activity,
    onChange: (value) => formik.setFieldValue('activity', value),
    suggestions,
    onSelectSuggestion: (name) => formik.setFieldValue('activity', name)
  };
  const energyField: EnergyFieldProps = {
    value: formik.values.energy,
    onChange: (value) => formik.setFieldValue('energy', value)
  };
  const impactField: ImpactFieldProps = {
    value: formik.values.impact,
    onChange: selectImpact
  };
  const noteField: NoteFieldProps = {
    value: formik.values.note,
    onChange: (value) => formik.setFieldValue('note', value)
  };

  const error = formik.submitCount > 0 ? formik.errors.activity ?? formik.errors.impact ?? '' : '';

  return {
    contextField,
    activityField,
    energyField,
    impactField,
    noteField,
    notePreview,
    error,
    toast,
    isSubmitting: formik.isSubmitting,
    submit: () => formik.handleSubmit()
  };
};
