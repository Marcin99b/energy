interface ChipProps {
  label: string;
  selected?: boolean;
  dashed?: boolean;
  onClick: () => void;
}

export const Chip = ({ label, selected, dashed, onClick }: ChipProps) => {
  const classNames = ['chip', selected && 'selected', dashed && 'dashed'].filter(Boolean).join(' ');
  return (
    <button type="button" className={classNames} onClick={onClick}>
      {label}
    </button>
  );
};
