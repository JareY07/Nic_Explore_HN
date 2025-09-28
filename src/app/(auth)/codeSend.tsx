import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import CodeScreen from '@/features/auth/screens/codeVeridication';
import { colors } from '@/theme/colors';

export default function CodeSend() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <CodeScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
