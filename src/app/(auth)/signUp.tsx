import SignUpScreen from '@/features/auth/screens/signupScreen';
import { colors } from '@/theme/colors';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function LoginTest() {
  const { theme } = useAppStore();
  const backgroundColor = theme === 'dark' ? colors.neutral[900] : colors.neutral.white;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SignUpScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
