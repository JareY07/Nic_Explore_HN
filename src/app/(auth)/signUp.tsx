import SignUpScreen from '@/features/auth/screens/signup';
import { colors } from '@/theme/colors';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

export default function SignUpTest() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SignUpScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
