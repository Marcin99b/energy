import { Card } from '../ui/Card';
import { EnergySlider } from '../ui/EnergySlider';
import { useLanguage } from '../../i18n/LanguageContext';

export interface EnergyFieldProps {
  value: number;
  onChange: (value: number) => void;
}

export const EnergyPicker = ({ value, onChange }: EnergyFieldProps) => {
  const { dict } = useLanguage();
  return (
    <Card className="energy-card">
      <div className="energy-header">
        <div className="label-sm">{dict.addEntryForm.energyLevel}</div>
        <div className="energy-badge">{value}/10</div>
      </div>
      <EnergySlider value={value} onChange={onChange} />
    </Card>
  );
};
