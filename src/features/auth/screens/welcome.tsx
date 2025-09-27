import {
  Platform,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import '../../../../global.css';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('@/assets/images/BeachBackground.jpg')}
          className="flex-1"
          resizeMode="cover">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Image
              resizeMode="contain"
              className="h-[170px] w-[300px] mt-[300px] mb-[100px]"
              source={require('@/assets/images/PresentationApp.png')}
            />
            {/* Botón de Iniciar sesión */}
            <MyButton
              onPress={() => router.push('/login')}
              variant="glass"
              title="Sign In"
              size="md"
              className="mx-10 mb-4"
              accessibilityLabel="Iniciar sesión"
            />

            {/* Botón de crear cuenta */}
            <MyButton
              onPress={() => {
                router.push('/signUp');
              }}
              title="Create an account"
              variant="text"
              size="sm"
              className="mx-6"
            />
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
