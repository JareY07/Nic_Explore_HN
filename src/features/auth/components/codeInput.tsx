// features/auth/components/codeInput.tsx
import React, { useRef, useState, useCallback } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { CodeInputProps } from '@/types/InputProps';
import { colors } from '@/theme/colors';
import useInputAnimation from '@/components/hooks/useInputAnimation'; // Importar el hook

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onBlur, error, label }) => {
  const inputRef = useRef<TextInput>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Usar el hook de animación para el contenedor principal
  const { getBorderClass, handleFocus, handleBlur, isFocused } = useInputAnimation();

  const digits = value.split('').concat(Array(6 - value.length).fill(''));

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
    setFocusedIndex(value.length < 6 ? value.length : 5);
    handleFocus(); // Llamar al handleFocus del hook
  }, [value.length, handleFocus]);

  const handleTextChange = useCallback(
    (text: string) => {
      const numericText = text.replace(/[^0-9]/g, '');
      const newValue = numericText.slice(0, 6);
      onChange(newValue);

      if (newValue.length === 6) {
        onBlur();
      }
    },
    [onChange, onBlur],
  );

  const handleKeyPress = useCallback(
    (e: any) => {
      if (e.nativeEvent.key === 'Backspace' && value.length > 0) {
        onChange(value.slice(0, -1));
        setFocusedIndex(value.length - 2 >= 0 ? value.length - 2 : 0);
      }
    },
    [value, onChange],
  );

  const handleBlurWithAnimation = useCallback(() => {
    handleBlur(); // Llamar al handleBlur del hook
    onBlur();
    setFocusedIndex(null);
  }, [handleBlur, onBlur]);

  return (
    <View className="mb-4">
      {label && <Text className="text-sm font-semibold mb-2 ml-1 text-neutral-700">{label}</Text>}

      <Pressable
        onPress={focusInput}
        className={`
          mb-1 p-3 rounded-2xl border-2 bg-white
          ${getBorderClass(error)} // Usar la función del hook
        `}>
        <View className="flex-row justify-between">
          {digits.map((digit, index) => (
            <View
              key={index}
              className={`
                w-12 h-14 rounded-[10px] border-2 justify-center items-center mx-1
                ${
                  focusedIndex === index
                    ? 'border-primary-300 bg-primary-50' // Verde claro para dígito activo
                    : 'border-neutral-200'
                }
                ${error ? 'border-status-error' : ''}
              `}>
              <Text className="text-xl font-bold text-neutral-800">{digit}</Text>
            </View>
          ))}
        </View>
      </Pressable>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleTextChange}
        onBlur={handleBlurWithAnimation}
        onFocus={focusInput}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        maxLength={6}
        className="opacity-0 absolute top-0 left-0 w-full h-full"
        accessibilityLabel={label}
        accessibilityHint={`Ingresa el código de verificación de 6 dígitos`}
        autoFocus={true}
        selectionColor={colors.primary[300]}
      />

      {error && <Text className="text-status-error text-sm mt-1 ml-1">{error.message}</Text>}
    </View>
  );
};

export default CodeInput;
