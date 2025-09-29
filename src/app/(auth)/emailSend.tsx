import EmailScreen from '@/features/auth/screens/emailSreen';
import { colors } from '@/theme/colors';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function SendCode() {
  const { theme } = useAppStore();
  const backgroundColor = theme === 'dark' ? colors.neutral[900] : colors.neutral.white;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <EmailScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
