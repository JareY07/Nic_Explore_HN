// features/auth/screens/login.tsx
import { View, Text, Alert } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import { useAuthStore } from '../store/useAuth';
import Checkbox from '@/components/ui/myInput/MyCheckBox';
import { useState, useMemo } from 'react';
import { AppleIcon, FacebookIcon, GoogleIcon, XIcon } from '@/components/icons/icons';
import { useAppStore } from '@/store/useAppStore';
import { APP_STRINGS } from '@/constants/shared';
import { authService } from '../services/authService';
import { colors } from '@/theme/colors';
import ImageLayout from '@/components/shared/layouts/imageLayout';
import AuthLayout from '@/components/shared/layouts/authLayout';

type FormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthFlow } = useAuthStore();

  const { logIn } = useAuthStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { username: '', password: '' },
  });
  const { theme } = useAppStore();

  const usernameRules = useMemo(
    () => ({
      required: 'Username is required',
      pattern: {
        value: /^[a-zA-Z0-9_-]+$/,
        message: 'Username must be coherent',
      },
    }),
    [],
  );

  const forgotPassword = () => {
    setAuthFlow('forgotPassword');
    router.push('/emailSend');
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      console.log('🔐 Intentando login con:', { email: data.username });

      // Llamar al servicio de login
      const authResponse = await authService.login({
        username: data.username,
        password: data.password,
      });

      console.log('✅ Login exitoso:', authResponse);
      // {"data": {"firstName": "Freddy", "id": 20, "lastName": "Mairena", "userMail": "freddyenmanuelmairenagutierrez@gmail.com", "userPassword": "$2b$08$ej3nBY6oh9BDQPfS0qOMHeiPnI6ug1ZTHmCWzgb32CyEVCLibGWZq", "username": "Freddyenmanuel"}

      logIn(authResponse);

      // Navegar al home
      router.replace('/(drawer)');
    } catch (error: any) {
      //   console.error('❌ Error en login:', error);
      //   console.error({ error });
      // Manejo específico de errores
      if (error.response?.status === 401) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
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
      <AuthLayout>
        {/* Título */}
        <Text
          className={`text-3xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-800'
          }`}>
          {APP_STRINGS.AUTH.LOGIN_TITLE}
        </Text>

        {/* Formulario */}
        <View className="mb-6">
          <MyInput
            control={control}
            name="username"
            rules={usernameRules}
            type="text"
            placeholder={APP_STRINGS.AUTH.USERNAME_PLACEHOLDER}
            label={APP_STRINGS.AUTH.USERNAME_LABEL}
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
            placeholder={APP_STRINGS.AUTH.PASSWORD_PLACEHOLDER}
            label={APP_STRINGS.AUTH.PASSWORD_LABEL}
          />

          {/* Checkbox y Forgot Password en misma línea */}
          <View className="flex-row justify-between items-center mb-6 w-full">
            <View className="flex-1">
              <Checkbox
                checked={isChecked}
                onToggle={setIsChecked}
                label={APP_STRINGS.AUTH.REMEMBER_ME}
                variant="primary"
                size="md"
              />
            </View>

            <View className="flex-shrink-0 ml-4">
              <MyButton
                onPress={forgotPassword}
                title={APP_STRINGS.AUTH.FORGOT_PASSWORD}
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
            title={isLoading ? APP_STRINGS.AUTH.SIGNING_IN : APP_STRINGS.AUTH.LOGIN_BTN}
            variant="primary"
            size="md"
            className="mb-6"
            accessibilityLabel={APP_STRINGS.AUTH.LOGIN_BTN}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>

        {/* Separador */}
        <View className="flex-row items-center justify-center mb-6">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text className="mx-4 text-neutral-500 text-sm font-medium">
            {APP_STRINGS.AUTH.OR_WITH}
          </Text>
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
          <Text className="text-neutral-600 text-base">{APP_STRINGS.AUTH.NO_ACCOUNT}</Text>
          <MyButton
            onPress={() => router.push('/signUp')}
            title={APP_STRINGS.AUTH.SIGNUP_LINK}
            variant="text-gray"
            textClassName="text-primary-800 font-semibold"
            size="sm"
          />
        </View>
      </AuthLayout>
    </ImageLayout>
  );
}
