export type SelectTriggerSize = "sm" | "default"

export interface SelectTriggerProps {
  size?: SelectTriggerSize
}

// FormInput 타입
export type FormInputType = 'text' | 'email' | 'password' | 'number' | 'url'
export type FormInputWidth = 'small' | 'medium' | 'large' | 'full'
export type FormInputFieldType = 'username' | 'email' | 'postTitle' | 'slug' | 'normal'
export type FormInputEntityType = 'user' | 'post'

export interface FormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: FormInputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: FormInputWidth;
  fieldType?: FormInputFieldType;
  entityType?: FormInputEntityType;
  checkBusinessRules?: boolean;
}

// FormSelect 타입
export interface FormSelectOption {
  value: string;
  label: string;
}

export type FormSelectSize = 'sm' | 'md' | 'lg'

export interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: FormSelectOption[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: FormSelectSize;
}

// FormTextarea 타입
export interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}

// FormCheckbox 타입
export interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

