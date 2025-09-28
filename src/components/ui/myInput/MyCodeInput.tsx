// components/ui/myInput/MyCodeInput.tsx
import { Controller } from 'react-hook-form';
import { memo } from 'react';
import CodeInput from '@/features/auth/components/codeInput';
import { InputProps } from '@/types/InputProps';

const MyCodeInput: React.FC<InputProps> = memo(
  ({ control, name, rules = {}, placeholder, label }) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <CodeInput
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            label={label}
          />
        )}
      />
    );
  },
);

MyCodeInput.displayName = 'MyCodeInput';
export default MyCodeInput;
