export type SelectTriggerSize = "sm" | "default"

export interface SelectTriggerProps {
  size?: SelectTriggerSize
}

// FormInput 타입
export type FormInputType = 'text' | 'email' | 'password' | 'number' | 'url'
export type FormInputWidth = 'small' | 'medium' | 'large' | 'full'

export interface FormInputProps {
  name: string;
  label?: string;
  type?: FormInputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  width?: FormInputWidth;
}

// FormSelect 타입
export interface FormSelectOption {
  value: string;
  label: string;
}

export type FormSelectSize = 'sm' | 'md' | 'lg'

export interface FormSelectProps {
  name: string;
  options: FormSelectOption[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  size?: FormSelectSize;
}

// FormTextarea 타입
export interface FormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  rows?: number;
}

// FormCheckbox 타입
export interface FormCheckboxProps {
  name: string;
  label: string;
  disabled?: boolean;
  hint?: string;
}

