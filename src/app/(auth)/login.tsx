import LoginScreen from '@/features/auth/screens/login';
import { colors } from '@/theme/colors';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

export default function LoginTest() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LoginScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
