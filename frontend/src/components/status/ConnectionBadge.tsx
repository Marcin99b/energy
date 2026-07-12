import { useLanguage } from '../../i18n/LanguageContext';
import type { ConnectionStatus } from '../../types';

interface ConnectionBadgeProps {
  status: ConnectionStatus;
}

export const ConnectionBadge = ({ status }: ConnectionBadgeProps) => {
  const { dict } = useLanguage();
  if (status === 'unknown') return null;

  const label = status === 'online' ? dict.connection.online : dict.connection.offline;

  return (
    <div className={`connection-badge connection-badge--${status}`}>
      <span className="connection-dot" />
      {label}
    </div>
  );
};
