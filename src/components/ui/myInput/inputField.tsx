// components/ui/myInput/inputField.tsx
import { TextInput, Pressable, View, Text } from 'react-native';
import i18n from '@/i18n';
import { memo, useState, useCallback } from 'react';
import { EyeOnIcon, EyeOffIcon } from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import CodeInput from '@/features/auth/components/codeInput';
import { InputFieldProps } from '@/types/InputProps';
import { useAppStore } from '@/store/useAppStore'; // Importar el store del tema

const InputField: React.FC<InputFieldProps> = memo(
  ({ value, onChange, onBlur, type, placeholder, trimSpaces, label, error }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useAppStore(); // Obtener el tema actual

    const handleBlurWithTrim = useCallback(() => {
      onBlur();
      setIsFocused(false);
      if (trimSpaces && value && type !== 'code') {
        onChange(value.trim());
      }
    }, [onBlur, trimSpaces, value, type, onChange]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const togglePasswordVisibility = useCallback(() => {
      setPasswordVisible((prev) => !prev);
    }, []);

    // Determinar colores basados en el tema
    const getBorderColor = useCallback(() => {
      if (error) return 'border-status-error';
      if (isFocused) {
        return theme === 'dark' ? 'border-primary-400' : 'border-primary-800';
      }
      return theme === 'dark' ? 'border-neutral-700' : 'border-neutral-100';
    }, [error, isFocused, theme]);

    const getBackgroundColor = useCallback(() => {
      return theme === 'dark' ? 'bg-neutral-800' : 'bg-white';
    }, [theme]);

    const getTextColor = useCallback(() => {
      return theme === 'dark' ? 'text-white' : 'text-neutral-800';
    }, [theme]);

    const getLabelColor = () => {
      return error
        ? 'text-status-error'
        : theme === 'dark'
          ? 'text-neutral-200'
          : 'text-neutral-700';
    };

    const getPlaceholderColor = theme === 'dark' ? '#9CA3AF' : '#9CA3AF';

    const inputComponent = useCallback(() => {
      if (type === 'code') {
        return (
          <CodeInput
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            label={label}
          />
        );
      }

      return (
        <View
          className={`flex-row items-center rounded-2xl border-2 ${getBorderColor()} ${getBackgroundColor()} ${
            isFocused ? 'shadow-lg' : 'shadow-sm'
          }`}>
          <TextInput
            value={value ? String(value) : ''}
            onChangeText={onChange}
            onBlur={handleBlurWithTrim}
            onFocus={handleFocus}
            placeholder={placeholder}
            placeholderTextColor={getPlaceholderColor}
            secureTextEntry={type === 'password' ? !passwordVisible : false}
            keyboardType={type === 'email' ? 'email-address' : 'default'}
            className={`flex-1 py-4 px-5 text-base font-medium ${getTextColor()}`}
            accessibilityLabel={label}
            accessibilityHint={`${i18n.t('INPUT.ACCESSIBILITY_HINT')} ${label?.toLowerCase()}`}
            autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            blurOnSubmit={false}
            returnKeyType="next"
            selectionColor={theme === 'dark' ? colors.primary[400] : colors.primary[500]}
          />

          {type === 'password' && (
            <Pressable
              onPress={togglePasswordVisibility}
              accessibilityLabel={i18n.t('INPUT.TOGGLE_PASSWORD')}
              className="pr-4"
              accessibilityHint={i18n.t('INPUT.TOGGLE_PASSWORD_HINT')}>
              {passwordVisible ? (
                <EyeOnIcon
                  color={
                    error
                      ? colors.status.error
                      : theme === 'dark'
                        ? colors.primary[400]
                        : colors.primary[500]
                  }
                  size={20}
                />
              ) : (
                <EyeOffIcon
                  color={
                    error
                      ? colors.status.error
                      : theme === 'dark'
                        ? colors.primary[400]
                        : colors.primary[500]
                  }
                  size={20}
                />
              )}
            </Pressable>
          )}
        </View>
      );
    }, [
      value,
      error,
      isFocused,
      passwordVisible,
      type,
      label,
      placeholder,
      handleBlurWithTrim,
      handleFocus,
      onBlur,
      onChange,
      togglePasswordVisibility,
      theme,
      getBackgroundColor,
      getBorderColor,
      getPlaceholderColor,
      getTextColor,
    ]);

    return (
      <View className="mb-4">
        {/* Label estático siempre visible */}
        {label && (
          <Text className={`text-sm font-semibold mb-2 ml-1 ${getLabelColor()}`}>{label}</Text>
        )}

        {inputComponent()}

        {/* Mensaje de error */}
        {error && <Text className="text-status-error text-sm mt-1 ml-1">{error.message}</Text>}
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.error?.message === nextProps.error?.message &&
      prevProps.type === nextProps.type &&
      prevProps.label === nextProps.label &&
      prevProps.placeholder === nextProps.placeholder
    );
  },
);

InputField.displayName = 'InputField';
export default InputField;
