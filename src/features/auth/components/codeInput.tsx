// features/auth/components/codeInput.tsx
import React, { useRef, useState, useCallback } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { CodeInputProps } from '@/types/InputProps';
import { colors } from '@/theme/colors';
import { useAppStore } from '@/store/useAppStore'; // Importar el store del tema

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onBlur, error, label }) => {
  const inputRef = useRef<TextInput>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isContainerFocused, setIsContainerFocused] = useState(false);
  const { theme } = useAppStore(); // Obtener el tema actual

  const digits = value.split('').concat(Array(6 - value.length).fill(''));

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
    setFocusedIndex(value.length < 6 ? value.length : 5);
    setIsContainerFocused(true);
  }, [value.length]);

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

  const handleBlur = useCallback(() => {
    onBlur();
    setFocusedIndex(null);
    setIsContainerFocused(false);
  }, [onBlur]);

  // Funciones para determinar colores basados en el tema
  const getContainerBorderColor = () => {
    if (error) return 'border-status-error';
    if (isContainerFocused) {
      return theme === 'dark' ? 'border-primary-400' : 'border-primary-300';
    }
    return theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200';
  };

  const getContainerBackgroundColor = () => {
    return theme === 'dark' ? 'bg-neutral-800' : 'bg-white';
  };

  const getDigitBorderColor = (index: number) => {
    if (error) return 'border-status-error';
    if (focusedIndex === index) {
      return theme === 'dark'
        ? 'border-primary-400 bg-primary-900'
        : 'border-primary-300 bg-primary-50';
    }
    return theme === 'dark' ? 'border-neutral-600' : 'border-neutral-200';
  };

  const getDigitTextColor = () => {
    return theme === 'dark' ? 'text-white' : 'text-neutral-800';
  };

  const getLabelColor = () => {
    return theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700';
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className={`text-sm font-semibold mb-2 ml-1 ${getLabelColor()}`}>{label}</Text>
      )}

      <Pressable
        onPress={focusInput}
        className={`mb-1 p-3 rounded-2xl border-2 ${getContainerBorderColor()} ${getContainerBackgroundColor()} ${
          isContainerFocused ? 'shadow-lg' : 'shadow-sm'
        }`}>
        <View className="flex-row justify-between">
          {digits.map((digit, index) => (
            <View
              key={index}
              className={`w-12 h-14 rounded-[10px] border-2 justify-center items-center mx-1 ${getDigitBorderColor(index)}`}>
              <Text className={`text-xl font-bold ${getDigitTextColor()}`}>{digit}</Text>
            </View>
          ))}
        </View>
      </Pressable>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleTextChange}
        onBlur={handleBlur}
        onFocus={focusInput}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        maxLength={6}
        className="opacity-0 absolute top-0 left-0 w-full h-full"
        accessibilityLabel={label}
        accessibilityHint={`Ingresa el código de verificación de 6 dígitos`}
        autoFocus={true}
        selectionColor={theme === 'dark' ? colors.primary[400] : colors.primary[300]}
      />

      {error && <Text className="text-status-error text-sm mt-1 ml-1">{error.message}</Text>}
    </View>
  );
};

export default CodeInput;
