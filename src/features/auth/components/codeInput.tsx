import React, { useRef, useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import ErrorMessage from '@/components/ui/myInput/ErrorMessage';
import { CodeInputProps } from '@/types/InputProps';

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onBlur, error, label }) => {
  const inputRef = useRef<TextInput>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const digits = value.split('').concat(Array(6 - value.length).fill(''));

  const focusInput = () => {
    inputRef.current?.focus();
    setFocusedIndex(value.length < 6 ? value.length : 5);
  };

  const handleTextChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newValue = numericText.slice(0, 6);
    onChange(newValue);

    if (newValue.length === 6) {
      onBlur();
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Backspace' && value.length > 0) {
      onChange(value.slice(0, -1));
      setFocusedIndex(value.length - 2 >= 0 ? value.length - 2 : 0);
    }
  };

  return (
    <View>
      <Pressable onPress={focusInput} className="mb-4 p-3 rounded-lg active:opacity-80">
        <View className="flex-row justify-between">
          {digits.map((digit, index) => (
            <View
              key={index}
              className={`
                w-12 h-14 rounded-[10px] border justify-center items-center mx-1
                ${
                  focusedIndex === index
                    ? 'border-primary-400 border-2 bg-primary-50'
                    : 'border-neutral-200 border'
                }
                ${error?.message ? 'border-status-error' : ''}
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
        onBlur={() => {
          onBlur();
          setFocusedIndex(null);
        }}
        onFocus={() => setFocusedIndex(value.length < 6 ? value.length : 5)}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        maxLength={6}
        className="opacity-0 absolute top-0 left-0 w-full h-full"
        accessibilityLabel={label}
        accessibilityHint={`Ingresa el código de verificación de 6 dígitos`}
        autoFocus={true}
      />

      <View className="min-h-[20px]">
        <ErrorMessage message={error?.message} />
      </View>
    </View>
  );
};

export default CodeInput;
