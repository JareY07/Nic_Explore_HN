import {
  Platform,
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
} from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import { useAuthStore } from '../store/useAuth';
import Checkbox from '@/components/ui/myInput/MyCheckBox';
import { useEffect, useState, useMemo } from 'react';
import { AppleIcon, FacebookIcon, GoogleIcon, XIcon } from '@/components/icons/icons';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { setAuthFlow, resetAuthFlow, logIn } = useAuthStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });

  const emailRules = useMemo(
    () => ({
      required: 'This field is required.',
      pattern: {
        value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        message: 'Invalid Email Address',
      },
    }),
    [],
  );

  const passwordRules = useMemo(
    () => ({
      required: 'This field is required.',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
      validate: (value: string) => {
        return (
          [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) ||
          'Must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        );
      },
    }),
    [],
  );

  const handleCreateAccount = () => {
    resetAuthFlow();
    setAuthFlow('createAccount');
    router.push('/signUp');
  };

  const handleLogin = (data: FormData) => {
    console.log('Datos del formulario:', data);
    logIn();
    router.replace('/(drawer)');
  };

  const handleForgotPassword = () => {
    resetAuthFlow();
    setAuthFlow('forgotPassword');
    router.push('/emailSend');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/BeachBackground.jpg')}
      className="flex-1"
      resizeMode="cover">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            paddingTop: isKeyboardVisible ? 40 : 0,
            paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Logo */}
          <Image
            resizeMode="contain"
            className="w-full h-[80px] mb-8"
            source={require('@/assets/images/miniLogo.png')}
          />

          <View
            className={`bg-white w-full rounded-t-[40px] px-8 pt-10 pb-8 ${isKeyboardVisible ? 'min-h-[100%]' : 'min-h-[70%]'}`}>
            {/* Título */}
            <Text className="text-3xl font-bold text-center text-neutral-800 mb-8">
              Welcome Back!
            </Text>

            {/* Formulario */}
            <View className="mb-6">
              <MyInput
                control={control}
                name="email"
                rules={emailRules}
                type="email"
                placeholder="your@email.com"
                label="Email"
                trimSpaces={true}
              />

              <MyInput
                control={control}
                name="password"
                rules={passwordRules}
                type="password"
                placeholder="Your password"
                label="Password"
              />

              {/* Checkbox y Forgot Password en misma línea */}
              <View className="flex-row justify-between items-center mb-6 w-full">
                <View className="flex-1">
                  <Checkbox
                    checked={isChecked}
                    onToggle={setIsChecked}
                    label="Remember me"
                    variant="primary"
                    size="md"
                  />
                </View>

                <View className="flex-shrink-0 ml-4">
                  <MyButton
                    onPress={handleForgotPassword}
                    title="Forgot Password?"
                    variant="text-gray"
                    size="sm"
                    className="py-1"
                    textClassName="whitespace-nowrap"
                  />
                </View>
              </View>

              {/* Botón de Sign In */}
              <MyButton
                onPress={handleSubmit(handleLogin)}
                variant="primary"
                title="Sign In"
                size="md"
                className="mb-6"
                accessibilityLabel="Sign In"
              />
            </View>

            {/* Separador con texto "sign in with" */}
            <View className="flex-row items-center justify-center mb-6">
              <View className="flex-1 h-px bg-neutral-200" />
              <Text className="mx-4 text-neutral-500 text-sm font-medium">or sign in with</Text>
              <View className="flex-1 h-px bg-neutral-200" />
            </View>

            {/* Botones de redes sociales */}
            <View className="flex-row justify-center space-x-4 mb-8">
              <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50">
                <XIcon size={20} color="#000000" />
              </View>
              <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50 mx-2">
                <FacebookIcon size={20} color="#1877F2" />
              </View>
              <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50 mx-2">
                <GoogleIcon size={20} color="#DB4437" />
              </View>
              <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50">
                <AppleIcon size={20} color="#000000" />
              </View>
            </View>

            {/* Botón de Sign Up */}
            <View className="flex-row justify-center items-center">
              <Text className="text-neutral-600 text-base">Do not have an account?</Text>
              <MyButton
                onPress={handleCreateAccount}
                title="Sign up"
                variant="text-gray"
                textClassName="text-primary-800 font-semibold"
                size="sm"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
