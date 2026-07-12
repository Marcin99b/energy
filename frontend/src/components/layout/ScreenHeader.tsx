import { LanguageSwitch } from './LanguageSwitch';
import { ConnectionBadge } from '../status/ConnectionBadge';
import type { ConnectionStatus } from '../../types';

interface ScreenHeaderProps {
  title: string;
  connectionStatus: ConnectionStatus;
}

export const ScreenHeader = ({ title, connectionStatus }: ScreenHeaderProps) => (
  <div className="screen-header">
    <div className="screen-title">{title}</div>
    <div className="screen-header-actions">
      <ConnectionBadge status={connectionStatus} />
      <LanguageSwitch />
    </div>
  </div>
);
