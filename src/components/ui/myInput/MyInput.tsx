// components/ui/myInput/MyInput.tsx
import InputField from '@/components/ui/myInput/inputField';
import { InputProps } from '@/types/InputProps';
import { Controller } from 'react-hook-form';
import React, { memo } from 'react';
const MyInput: React.FC<InputProps> = memo(
  ({ control, name, rules = {}, type = 'text', placeholder, label, trimSpaces = false }) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <InputField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            trimSpaces={trimSpaces}
            label={label}
            error={error}
          />
        )}
      />
    );
  },
);

MyInput.displayName = 'MyInput';
export default MyInput;
