interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
}

export const Skeleton = ({ width = '100%', height = '14px', radius = '6px' }: SkeletonProps) => (
  <div className="skeleton" style={{ width, height, borderRadius: radius }} />
);
