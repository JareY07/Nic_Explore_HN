import React from 'react';
import { View, TextInput } from 'react-native';
import { Caption } from '@/components/ui/typhography';
import { useThemeData } from '@/components/hooks/useTheme';

type PaymentMethodFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  keyboardType: 'number-pad' | 'default';
  maxLength: number;
  secure?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
};

export default function PaymentMethodField({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
  maxLength,
  secure,
  onFocus,
  onBlur,
  error,
}: PaymentMethodFieldProps) {
  const { theme: appTheme, isDarkMode } = useThemeData();
  const [isFocused, setIsFocused] = React.useState(false);
  const textColor = isDarkMode ? appTheme.colors.neutral.white : appTheme.colors.neutral[900];
  const subtextColor = isDarkMode ? appTheme.colors.neutral[400] : appTheme.colors.neutral[500];
  const inputBg = isDarkMode ? appTheme.colors.neutral[800] : '#fbfbfd';
  const borderColor = error
    ? appTheme.colors.status.error
    : isFocused
      ? appTheme.brand.primary
      : isDarkMode
        ? appTheme.colors.neutral[700]
        : appTheme.colors.neutral[200];

  return (
    <View className="mb-4 rounded-2xl">
      <Caption className="mb-1 ml-1" style={{ color: subtextColor, letterSpacing: 0.2 }}>
        {label}
      </Caption>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={subtextColor}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secure}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        style={{
          backgroundColor: inputBg,
          borderWidth: 1,
          borderColor,
          borderRadius: 18,
          paddingHorizontal: 18,
          paddingVertical: 14,
          color: textColor,
          fontSize: 15,
        }}
      />
      {error ? (
        <Caption
          className="mt-1 ml-1"
          style={{ color: appTheme.colors.status.error, fontSize: 12 }}>
          {error}
        </Caption>
      ) : null}
    </View>
  );
}
