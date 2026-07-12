import { ImpactButton } from '../ui/ImpactButton';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Impact } from '../../types';

export interface ImpactFieldProps {
  value: Impact | null;
  onChange: (value: Impact) => void;
}

export const ImpactPicker = ({ value, onChange }: ImpactFieldProps) => {
  const { dict } = useLanguage();
  return (
    <div>
      <div className="label-sm section-label">{dict.addEntryForm.impactQuestion}</div>
      <div className="impact-row">
        <ImpactButton
          direction="increase"
          label={dict.addEntryForm.impactIncrease}
          selected={value === 'increase'}
          onClick={() => onChange('increase')}
        />
        <ImpactButton
          direction="decrease"
          label={dict.addEntryForm.impactDecrease}
          selected={value === 'decrease'}
          onClick={() => onChange('decrease')}
        />
      </div>
    </div>
  );
};
