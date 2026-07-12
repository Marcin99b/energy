import { useLanguage } from '../../i18n/LanguageContext';

interface FetchErrorNoticeProps {
  onRetry: () => void;
}

export const FetchErrorNotice = ({ onRetry }: FetchErrorNoticeProps) => {
  const { dict } = useLanguage();
  return (
    <div className="fetch-error-notice">
      <span>{dict.common.fetchError}</span>
      <button type="button" className="fetch-error-retry" onClick={onRetry}>
        {dict.common.retry}
      </button>
    </div>
  );
};
