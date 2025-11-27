import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from './input';
import { cn } from '@/lib/utils';
import type { FormInputProps } from './types';

// React Hook Form과 통합된 FormInput
export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  helpText,
  width = 'full',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const widthClasses = {
    small: 'w-[200px]',
    medium: 'w-[300px]',
    large: 'w-[400px]',
    full: 'w-full',
  };

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
          <Input
            id={name}
            name={name}
            type={type}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              'form-input',
              widthClasses[width],
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

