// features/auth/screens/login.tsx
import {
  Platform,
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  Keyboard,
  Alert,
} from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import { useAuthStore } from '../store/useAuth';
import Checkbox from '@/components/ui/myInput/MyCheckBox';
import { useState, useEffect, useMemo } from 'react';
import { AppleIcon, FacebookIcon, GoogleIcon, XIcon } from '@/components/icons/icons';
import { useAppStore } from '@/store/useAppStore';
import { authService } from '../services/authService';
import { colors } from '@/theme/colors';
import ImageLayout from '@/components/shared/layouts/imageLayout';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAuthStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });
  const { theme } = useAppStore();

  const backgroundImage =
    theme === 'dark'
      ? require('@/assets/images/GranadaBackground.jpg')
      : require('@/assets/images/BeachBackground.jpg');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      console.log('🔐 Intentando login con:', { email: data.email });

      // Llamar al servicio de login
      const authResponse = await authService.login({
        userMail: data.email,
        userPassword: data.password,
      });

      console.log('✅ Login exitoso:', authResponse);
      // {"data": {"firstName": "Freddy", "id": 20, "lastName": "Mairena", "userMail": "freddyenmanuelmairenagutierrez@gmail.com", "userPassword": "$2b$08$ej3nBY6oh9BDQPfS0qOMHeiPnI6ug1ZTHmCWzgb32CyEVCLibGWZq", "username": "Freddyenmanuel"}

      logIn(authResponse);

      // Navegar al home
      router.replace('/(drawer)');
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      console.error({ error });
      // Manejo específico de errores
      if (error.response?.status === 401) {
        Alert.alert('Error', 'Email o contraseña incorrectos');
      } else if (error.response?.status === 404) {
        Alert.alert('Error', 'Usuario no encontrado');
      } else if (error.response?.data?.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'No se pudo iniciar sesión. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageLayout>
      {/* Logo */}
      <Image
        resizeMode="contain"
        className="w-full h-[80px] mt-20 mb-8"
        source={require('@/assets/images/miniLogo.png')}
      />

      <View
        className={`w-full rounded-t-[40px] px-8 pt-10 pb-8 ${
          isKeyboardVisible ? 'min-h-[100%]' : 'min-h-[70%]'
        } ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
        {/* Título */}
        <Text
          className={`text-3xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-800'
          }`}>
          Welcome Back
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
            rules={{
              required: 'The password is required',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            }}
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
                onPress={() => router.push('/emailSend')}
                title="Forgot Password?"
                variant="text-gray"
                size="sm"
                className="py-1"
                textClassName="whitespace-nowrap"
              />
            </View>
          </View>

          {/* Botón de Login */}
          <MyButton
            onPress={handleSubmit(onSubmit)}
            title={isLoading ? 'Signing In...' : 'Sign In'}
            variant="primary"
            size="md"
            className="mb-6"
            accessibilityLabel="Sign In"
            disabled={isLoading}
            loading={isLoading}
          />
        </View>

        {/* Separador */}
        <View className="flex-row items-center justify-center mb-6">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text className="mx-4 text-neutral-500 text-sm font-medium">or sign in with</Text>
          <View className="flex-1 h-px bg-neutral-200" />
        </View>

        {/* Botones de redes sociales */}
        <View className="flex-row justify-center space-x-4 mb-8">
          <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50">
            <XIcon
              size={20}
              color={theme === 'dark' ? colors.neutral.white : colors.neutral.black}
            />
          </View>
          <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50 mx-2">
            <FacebookIcon size={20} color="#1877F2" />
          </View>
          <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50 mx-2">
            <GoogleIcon size={20} color="#DB4437" />
          </View>
          <View className="w-12 h-12 rounded-full border border-neutral-200 items-center justify-center active:bg-neutral-50">
            <AppleIcon
              size={20}
              color={theme === 'dark' ? colors.neutral.white : colors.neutral.black}
            />
          </View>
        </View>

        {/* Botón de Sign Up */}
        <View className="flex-row justify-center items-center">
          <Text className="text-neutral-600 text-base">Do not have an account?</Text>
          <MyButton
            onPress={() => router.push('/signUp')}
            title="Sign up"
            variant="text-gray"
            textClassName="text-primary-800 font-semibold"
            size="sm"
          />
        </View>
      </View>
    </ImageLayout>
  );
}
