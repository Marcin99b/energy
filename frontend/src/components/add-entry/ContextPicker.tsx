import { useState } from 'react';
import { Chip } from '../ui/Chip';
import { useLanguage } from '../../i18n/LanguageContext';

export interface ContextPickerProps {
  options: string[];
  selected: string | null;
  onSelect: (context: string) => void;
  onAddCustom: (context: string) => void;
}

export const ContextPicker = ({ options, selected, onSelect, onAddCustom }: ContextPickerProps) => {
  const { dict } = useLanguage();
  const [showInput, setShowInput] = useState(false);
  const [draft, setDraft] = useState('');

  const confirmCustomContext = () => {
    setShowInput(false);
    onAddCustom(draft);
    setDraft('');
  };

  return (
    <div className="context-row">
      {options.map((label) => (
        <Chip key={label} label={label} selected={selected === label} onClick={() => onSelect(label)} />
      ))}
      {showInput ? (
        <div className="custom-context-row">
          <input
            className="custom-context-input"
            placeholder={dict.addEntryForm.customContextPlaceholder}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmCustomContext()}
            autoFocus
          />
          <button type="button" onClick={confirmCustomContext} className="custom-context-confirm">
            ✓
          </button>
        </div>
      ) : (
        <Chip label={dict.addEntryForm.addCustomContext} dashed onClick={() => setShowInput(true)} />
      )}
    </div>
  );
};
