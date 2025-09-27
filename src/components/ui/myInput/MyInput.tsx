import InputContainer from '@/components/ui/myInput/InputContainer';
import InputField from '@/components/ui/myInput/inputField';
import { InputProps } from '@/types/InputProps';
import { Controller } from 'react-hook-form';
import React from 'react';

const MyInput: React.FC<InputProps> = ({
  control,
  name,
  rules = {},
  type = 'text',
  placeholder,
  errors = {},
  label,
  trimSpaces = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <InputContainer label={label} error={error}>
          <InputField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            trimSpaces={trimSpaces}
            label={label}
            error={errors}
          />
        </InputContainer>
      )}
    />
  );
};

export default MyInput;
