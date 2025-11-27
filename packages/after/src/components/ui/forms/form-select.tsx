import React, { useState, useEffect, useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { cn } from '@/lib/utils';
import type { FormSelectProps } from './types';

// Select Component - Inconsistent with Input component
export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'md',
}) => {
  const [open, setOpen] = useState(false);
  const hiddenSelectRef = useRef<HTMLSelectElement>(null);

  const selectSize = size === 'sm' ? 'sm' : 'default';

  // shadcn Select의 값이 변경되면 숨겨진 select도 동기화
  useEffect(() => {
    if (hiddenSelectRef.current) {
      hiddenSelectRef.current.value = value || '';
    }
  }, [value]);

  // 숨겨진 select의 값이 변경되면 (테스트에서) shadcn Select도 동기화
  const handleHiddenSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      {/* 테스트를 위한 숨겨진 실제 select 요소 */}
      <select
        ref={hiddenSelectRef}
        name={name}
        value={value}
        onChange={handleHiddenSelectChange}
        required={required}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* 실제 표시되는 shadcn Select */}
      <Select
        value={value || undefined}
        onValueChange={onChange}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          size={selectSize}
          className={cn(
            'form-select w-full',
            error && 'error'
          )}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <span className={cn('form-helper-text error')}>{error}</span>
      )}
      {helpText && !error && (
        <span className="form-helper-text">{helpText}</span>
      )}
    </div>
  );
};

