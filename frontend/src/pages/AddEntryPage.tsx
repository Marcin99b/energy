import { Card } from '../components/ui/Card';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { FormError } from '../components/ui/FormError';
import { Toast } from '../components/ui/Toast';
import { Spinner } from '../components/ui/Spinner';
import { ContextPicker } from '../components/add-entry/ContextPicker';
import { ActivityInput } from '../components/add-entry/ActivityInput';
import { EnergyPicker } from '../components/add-entry/EnergyPicker';
import { ImpactPicker } from '../components/add-entry/ImpactPicker';
import { NotePreview } from '../components/add-entry/NotePreview';
import { NoteInput } from '../components/add-entry/NoteInput';
import { useAddEntryForm } from '../hooks/useAddEntryForm';
import { useLanguage } from '../i18n/LanguageContext';
import type { ConnectionStatus, NewEntryInput, RankedActivityName } from '../types';

interface AddEntryPageProps {
  rankedActivityNames: RankedActivityName[];
  onSubmit: (entry: NewEntryInput) => Promise<void>;
  connectionStatus: ConnectionStatus;
}

export const AddEntryPage = ({ rankedActivityNames, onSubmit, connectionStatus }: AddEntryPageProps) => {
  const { dict } = useLanguage();
  const form = useAddEntryForm({ rankedActivityNames, onSubmit });

  return (
    <div className="screen">
      <ScreenHeader title={dict.addEntryForm.screenTitle} connectionStatus={connectionStatus} />

      <Card className="context-card">
        <ContextPicker {...form.contextField} />
        <div className="divider" />
        <ActivityInput {...form.activityField} />
      </Card>

      <EnergyPicker {...form.energyField} />

      <ImpactPicker {...form.impactField} />

      <NotePreview text={form.notePreview} />

      <NoteInput {...form.noteField} />

      <FormError message={form.error} />

      <button
        type="button"
        className={`btn-cta ${form.isSubmitting ? 'is-loading' : ''}`}
        onClick={form.submit}
        disabled={form.isSubmitting}
      >
        {form.isSubmitting ? <Spinner /> : dict.addEntryForm.submit}
      </button>

      <Toast message={form.toast} />
    </div>
  );
};
