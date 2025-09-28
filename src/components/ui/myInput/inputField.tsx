import { TextInput, Pressable, View, Text } from 'react-native';
import { memo, useState, useCallback } from 'react';
import { EyeOnIcon, EyeOffIcon } from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import CodeInput from '@/features/auth/components/codeInput';
import { InputFieldProps } from '@/types/InputProps';

const InputField: React.FC<InputFieldProps> = memo(
  ({ value, onChange, onBlur, type, placeholder, trimSpaces, label, error }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Usar useCallback para evitar recrear funciones
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

    // Memoizar el componente para evitar re-renders innecesarios
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
          className="flex-row items-center rounded-2xl bg-white border-2
          ${error
            ? 'border-status-error'
            : isFocused
              ? 'border-primary-800 shadow-lg'
              : 'border-neutral-100 shadow-sm'
          }">
          <TextInput
            value={value ? String(value) : ''}
            onChangeText={onChange}
            onBlur={handleBlurWithTrim}
            onFocus={handleFocus}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={type === 'password' ? !passwordVisible : false}
            keyboardType={type === 'email' ? 'email-address' : 'default'}
            className="flex-1 py-4 px-5 text-neutral-800 text-base font-medium"
            accessibilityLabel={label}
            accessibilityHint={`Ingresa tu ${label?.toLowerCase()}`}
            autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            // IMPORTANTE: Agregar estas props para manejar el foco
            blurOnSubmit={false}
            returnKeyType="next"
          />

          {type === 'password' && (
            <Pressable
              onPress={togglePasswordVisibility}
              accessibilityLabel="Alternar visibilidad de contraseña"
              className="pr-4"
              accessibilityHint="Presiona para mostrar u ocultar la contraseña">
              {passwordVisible ? (
                <EyeOnIcon color={error ? colors.status.error : colors.primary[500]} size={20} />
              ) : (
                <EyeOffIcon color={error ? colors.status.error : colors.primary[500]} size={20} />
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
    ]);

    return (
      <View className="mb-4">
        {/* Label estático siempre visible */}
        {label && (
          <Text
            className={`
              text-sm font-semibold mb-2 ml-1
              ${error ? 'text-status-error' : 'text-neutral-700'}
            `}>
            {label}
          </Text>
        )}

        {inputComponent()}

        {/* Mensaje de error */}
        {error && <Text className="text-status-error text-sm mt-1 ml-1">{error.message}</Text>}
      </View>
    );
  },
  // Custom comparison function para memo - EVITA re-renders innecesarios
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
