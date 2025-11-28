import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Select, SelectItem } from './native-select';
import type { FormSelectProps } from './types';

// React Hook Form과 통합된 FormSelect
export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  helpText,
  size = 'md',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const selectClasses = cn('form-select', error && 'error');
  
  // Keep size for API consistency but not used in rendering
  void size;

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
          <Select
            id={name}
            name={name}
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={field.onBlur}
            required={required}
            disabled={disabled}
            className={cn(selectClasses, 'w-full')}
            aria-invalid={!!error}
          >
            <SelectItem value="" disabled>
              {placeholder}
            </SelectItem>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
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

