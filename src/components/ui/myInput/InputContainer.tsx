import React from 'react';
import { View } from 'react-native';
import { InputContainerProps } from '@/types/InputProps';
import '../../../../global.css';

const InputContainer: React.FC<InputContainerProps> = ({ children, label, error }) => {
  return <View className="mb-6">{children}</View>;
};

export default InputContainer;
