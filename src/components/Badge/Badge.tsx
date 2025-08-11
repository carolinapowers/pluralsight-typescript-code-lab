import React from 'react'
import { BadgeProps } from '../../types/component'
import styles from './Badge.module.css';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  testId,
}) => {
  // Build class names based on props - type-safe!
  const badgeClasses = [
    styles.badge,
    styles[variant], // TypeScript knows variant is a valid key
    styles[size], // TypeScript knows size is a valid key
    dot && styles.dot,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (dot) {
    return (
      <span
        className={badgeClasses}
        data-testid={testId}
        aria-label={`${variant} status indicator`}
      />
    );
  }

  return (
    <span className={badgeClasses} data-testid={testId}>
      {children}
    </span>
  );
}