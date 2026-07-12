import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

export const ActivityStatCardSkeleton = () => (
  <Card className="stat-card">
    <div className="stat-header">
      <Skeleton width="45%" height="15px" />
      <Skeleton width="60px" height="12px" />
    </div>
    <Skeleton height="9px" radius="5px" />
    <Skeleton width="80%" height="11px" />
  </Card>
);
