import SignUpStepTwoScreen from '@/features/auth/screens/signupStepTwo';
import { colors } from '@/theme/colors';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

export default function SignUpStepTwoTest() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SignUpStepTwoScreen />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
