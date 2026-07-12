import { Card } from '../ui/Card';
import { useLanguage } from '../../i18n/LanguageContext';

export interface NoteFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const NoteInput = ({ value, onChange }: NoteFieldProps) => {
  const { dict } = useLanguage();
  return (
    <div>
      <div className="label-sm section-label">{dict.addEntryForm.noteLabel}</div>
      <Card className="note-card">
        <textarea
          className="text-input"
          rows={2}
          placeholder={dict.addEntryForm.notePlaceholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Card>
    </div>
  );
};
