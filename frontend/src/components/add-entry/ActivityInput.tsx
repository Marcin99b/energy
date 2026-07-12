import { useState } from 'react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../i18n/LanguageContext';
import type { RankedActivityName } from '../../types';

export interface ActivityInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: RankedActivityName[];
  onSelectSuggestion: (name: string) => void;
}

export const ActivityInput = ({ value, onChange, suggestions, onSelectSuggestion }: ActivityInputProps) => {
  const { dict } = useLanguage();
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="activity-field">
      <input
        className="text-input"
        placeholder={dict.addEntryForm.activityPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <Card className="suggestions">
          {suggestions.map(({ name, count }) => (
            <div
              key={name}
              onMouseDown={() => {
                onSelectSuggestion(name);
                setShowSuggestions(false);
              }}
              className="suggestion-item"
            >
              {name} <span className="suggestion-count">· {count}x</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};
