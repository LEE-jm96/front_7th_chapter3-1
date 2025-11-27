import React from 'react';
import { Textarea } from './textarea';
import { cn } from '@/lib/utils';
import type { FormTextareaProps } from './types';

// Textarea Component - Yet another inconsistent API
export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        className={cn(
          'form-textarea',
          error && 'error'
        )}
      />

      {error && (
        <span className={cn('form-helper-text error')}>{error}</span>
      )}
      {helpText && !error && (
        <span className="form-helper-text">{helpText}</span>
      )}
    </div>
  );
};

