import React, { useState } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import type { FormInputProps } from './types';

// 🚨 Bad Practice: UI 컴포넌트가 도메인 규칙을 알고 있음
export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  width = 'full',
  fieldType = 'normal',
  entityType,
  checkBusinessRules = false,
}) => {
  const [internalError, setInternalError] = useState('');

  // 🚨 Bad Practice: UI 컴포넌트가 비즈니스 규칙을 검증함
  const validateField = (val: string) => {
    setInternalError('');

    if (!val) return;

    // 기본 필드 타입 검증
    if (fieldType === 'username') {
      if (val.length < 3) {
        setInternalError('사용자명은 3자 이상이어야 합니다');
      } else if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        setInternalError('영문, 숫자, 언더스코어만 사용 가능합니다');
      } else if (val.length > 20) {
        setInternalError('사용자명은 20자 이하여야 합니다');
      }

      // 🚨 도메인 특화 검증: 예약어 체크
      if (checkBusinessRules) {
        const reservedWords = ['admin', 'root', 'system', 'administrator'];
        if (reservedWords.includes(val.toLowerCase())) {
          setInternalError('예약된 사용자명입니다');
        }
      }
    } else if (fieldType === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setInternalError('올바른 이메일 형식이 아닙니다');
      }

      // 🚨 비즈니스 규칙: User 엔티티의 이메일은 회사 도메인만
      if (checkBusinessRules && entityType === 'user') {
        if (!val.endsWith('@company.com') && !val.endsWith('@example.com')) {
          setInternalError('회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다');
        }
      }
    } else if (fieldType === 'postTitle') {
      if (val.length < 5) {
        setInternalError('제목은 5자 이상이어야 합니다');
      } else if (val.length > 100) {
        setInternalError('제목은 100자 이하여야 합니다');
      }

      // 🚨 비즈니스 규칙: 금칙어 체크
      if (checkBusinessRules && entityType === 'post') {
        const bannedWords = ['광고', '스팸', '홍보'];
        const hasBannedWord = bannedWords.some((word) => val.includes(word));
        if (hasBannedWord) {
          setInternalError('제목에 금지된 단어가 포함되어 있습니다');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validateField(newValue);
  };

  const displayError = error || internalError;
  const widthClasses = {
    small: 'w-[200px]',
    medium: 'w-[300px]',
    large: 'w-[400px]',
    full: 'w-full',
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!displayError}
        className={cn(
          'form-input',
          widthClasses[width],
          displayError && 'error'
        )}
      />

      {displayError && (
        <span className={cn('form-helper-text error')}>{displayError}</span>
      )}
      {helpText && !displayError && (
        <span className="form-helper-text">{helpText}</span>
      )}
    </div>
  );
};

