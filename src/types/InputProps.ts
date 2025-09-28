import { Control } from 'react-hook-form';

export interface InputProps {
  control: Control<any>;
  name: 'password' | 'email' | 'firstName' | 'lastName' | 'username' | 'confirmPassword' | 'code';
  rules?: object;
  type?: 'text' | 'password' | 'email' | 'code';
  placeholder?: string;
  label: string;
  trimSpaces?: boolean;
  className?: string;
}

export interface InputContainerProps {
  children: React.ReactNode;
  label?: string;
  error?: {
    message?: string;
  };
  type?: string;
}

export interface InputFieldProps {
  value: any;
  onChange: (value: string) => void;
  onBlur: () => void;
  type: string;
  placeholder?: string;
  trimSpaces: boolean;
  label?: string;
  error?: any;
}

export interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: any;
  label?: string;
}
