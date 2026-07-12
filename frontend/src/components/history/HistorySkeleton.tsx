import { Skeleton } from '../ui/Skeleton';
import { EntryCardSkeleton } from './EntryCardSkeleton';

export const HistorySkeleton = () => (
  <div className="history-group">
    <Skeleton width="70px" height="11px" />
    <EntryCardSkeleton />
    <EntryCardSkeleton />
    <EntryCardSkeleton />
  </div>
);
