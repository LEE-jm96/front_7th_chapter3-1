import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { FormCheckboxProps } from './types';

// React Hook Form과 통합된 FormCheckbox
export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  disabled = false,
  hint,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  const wrapperClasses = ['checkbox-wrapper', disabled && 'disabled'].filter(Boolean).join(' ');
  const labelClasses = ['checkbox-label', error && 'error', disabled && 'disabled']
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const checked = Boolean(value);
          const customClasses = ['checkbox-custom', checked && 'checked', disabled && 'disabled']
            .filter(Boolean)
            .join(' ');
          const checkmarkClasses = ['checkbox-checkmark', checked && 'visible']
            .filter(Boolean)
            .join(' ');

          const handleClick = () => {
            if (!disabled) {
              onChange(!checked);
            }
          };

          return (
            <div className={wrapperClasses} onClick={handleClick}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name={name}
                  checked={checked}
                  onChange={() => {}} // Handled by onClick
                  disabled={disabled}
                  className="checkbox-input"
                />
                <div className={customClasses}>
                  <span className={checkmarkClasses}>✓</span>
                </div>
              </div>
              <label className={labelClasses}>{label}</label>
            </div>
          );
        }}
      />

      {error && <span className="checkbox-error">{error}</span>}
      {hint && !error && <span className="checkbox-hint">{hint}</span>}
    </div>
  );
};

