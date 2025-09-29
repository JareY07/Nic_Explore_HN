import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import CodeScreen from '@/features/auth/screens/codeScreen';
import { colors } from '@/theme/colors';
import { useAppStore } from '../store/useAppStore';

export default function CodeSend() {
  const { theme } = useAppStore();
  const backgroundColor = theme === 'dark' ? colors.neutral[900] : colors.neutral.white;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <CodeScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
