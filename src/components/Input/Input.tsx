import React from 'react'
import { InputProps } from '../../types/component'
import styles from './Input.module.css'

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  disabled = false,
  error = false,
  errorMessage,
  onChange,
  className = '',
  testId,
}) => {
  const inputClasses = [
    styles.input,
    error && styles.inputError,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputClasses}
        data-testid={testId}
      />
      {error && errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}