import type { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Card = ({ children, className, style }: CardProps) => {
  return (
    <div className={className ? `card ${className}` : 'card'} style={style}>
      {children}
    </div>
  );
};
