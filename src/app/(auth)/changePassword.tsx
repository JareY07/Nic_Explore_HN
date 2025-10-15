import ChangePasswordScreen from '@/features/auth/screens/passwordChangeScreen';
import { colors } from '@/theme/colors';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useAppStore } from '@/store/useAppStore';

export default function ChangePass() {
  const { theme } = useAppStore();
  const backgroundColor = theme === 'dark' ? colors.neutral[900] : colors.neutral.white;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ChangePasswordScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
