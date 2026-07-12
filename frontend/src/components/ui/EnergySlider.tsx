import type { CSSProperties } from 'react';

interface EnergySliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const EnergySlider = ({ value, onChange, min = 0, max = 10 }: EnergySliderProps) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      className="slider"
      min={min}
      max={max}
      step={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ '--pct': `${pct}%` } as CSSProperties}
      aria-label="Poziom energii"
    />
  );
};
