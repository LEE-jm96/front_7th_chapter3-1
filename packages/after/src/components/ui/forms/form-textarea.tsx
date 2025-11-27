import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Textarea } from './textarea';
import { cn } from '@/lib/utils';
import type { FormTextareaProps } from './types';

// React Hook Form과 통합된 FormTextarea
export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  helpText,
  rows = 4,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            id={name}
            name={name}
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
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

