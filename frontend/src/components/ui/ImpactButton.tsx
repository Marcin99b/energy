import { IMPACT_ARROWS } from '../../utils/impact';
import type { Impact } from '../../types';

interface ImpactButtonProps {
  direction: Impact;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const ImpactButton = ({ direction, label, selected, onClick }: ImpactButtonProps) => {
  const classNames = ['impact-btn', selected && `selected-${direction}`].filter(Boolean).join(' ');
  return (
    <button type="button" className={classNames} onClick={onClick}>
      <span className="arrow">{IMPACT_ARROWS[direction]}</span>
      <span className="label">{label}</span>
    </button>
  );
};
