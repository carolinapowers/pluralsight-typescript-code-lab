import React from 'react'
import { CardProps } from '../../types/component'
import styles from './Card.module.css'

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  padding = 'md',
  shadow = true,
  className = '',
  testId,
}) => {
  const cardClasses = [
    styles.card,
    styles[padding],
    shadow && styles.shadow,
    className
  ].filter(Boolean).join(' ')

  const titleClasses = [
    styles.title,
    subtitle && styles.titleWithSubtitle
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses} data-testid={testId}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={titleClasses}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      
      <div className={styles.content}>
        {children}
      </div>
      
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  )
}