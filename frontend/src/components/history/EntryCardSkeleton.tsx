import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

export const EntryCardSkeleton = () => (
  <Card className="entry-card">
    <div className="entry-header">
      <Skeleton width="40px" height="40px" radius="50%" />
      <div className="entry-body entry-skeleton-body">
        <Skeleton width="60%" height="13px" />
        <Skeleton width="35%" height="11px" />
      </div>
    </div>
  </Card>
);
