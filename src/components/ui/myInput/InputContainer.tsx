import React from 'react';
import { View, Text } from 'react-native';
import ErrorMessage from '@/components/ui/myInput/ErrorMessage';
import { InputContainerProps } from '@/types/InputProps';
import '../../../../global.css';

const InputContainer: React.FC<InputContainerProps> = ({ children, label, error }) => {
  return (
    <View className="mx-[30px] mb-2">
      {label && <Text className="text-neutral-500 font-bold mb-2">{label}</Text>}
      {children}
      <View className="min-h-[20px]">
        <ErrorMessage message={error?.message} />
      </View>
    </View>
  );
};

export default InputContainer;
