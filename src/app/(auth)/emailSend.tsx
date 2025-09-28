import EmailScreen from '@/features/auth/screens/email';
import { colors } from '@/theme/colors';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';

export default function sendCode() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <EmailScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
