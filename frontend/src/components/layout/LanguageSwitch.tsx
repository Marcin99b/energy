import { useLanguage } from '../../i18n/LanguageContext';
import type { Language } from '../../i18n/translations';

const OPTIONS: Language[] = ['pl', 'en'];

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switch">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`language-switch-btn ${option === language ? 'active' : ''}`}
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
