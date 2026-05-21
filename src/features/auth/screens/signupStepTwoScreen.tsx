import { Text, View, Alert } from 'react-native';
import MyInput from '@/components/ui/myInput/MyInput';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '../store/useAuth';
import { authService } from '../services/authService';
import ImageLayout from '@/components/shared/layouts/imageLayout';
import AuthLayout from '@/components/shared/layouts/authLayout';
import { APP_STRINGS } from '@/constants/shared';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpStepTwoScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // ✅ FALTABA ESTA LÍNEA

  const { signUpData, clearSignUpData } = useAuthStore();
  const { control, handleSubmit, watch, setError, clearErrors } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const { theme } = useAppStore();
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
    } else if (confirmPassword && password === confirmPassword) {
      clearErrors('confirmPassword');
    }
  }, [password, confirmPassword, setError, clearErrors]);

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

  const repeatPasswordRules = useMemo(
    () => ({
      required: 'Please confirm your password',
    }),
    [],
  );
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      // Combina los datos de ambas pantallas
      const authResponse = await authService.signUp({
        ...signUpData, // Datos de la primera pantalla
        email: data.email,
        password: data.password,
      });

      // ver API;
      console.log('Datos completos de la API:', authResponse);

      clearSignUpData();

      // Navega a la siguiente pantalla
      router.push('/codeSend');
    } catch (error: any) {
      if (error.response?.status === 404) {
        Alert.alert('Error', 'Usuario existente');
      } else if (error.response?.data?.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario. Intenta nuevamente.');
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
          {APP_STRINGS.AUTH.COMPLETE_REGISTRATION}
        </Text>

        {/* Muestra los datos de la primera pantalla (opcional) */}
        {signUpData && (
          <View className="mb-4 p-3 bg-primary-50 rounded-lg">
            <Text className="text-primary-800 text-sm">
              Personal info: {signUpData.firstName} {signUpData.lastName} (@{signUpData.username})
            </Text>
          </View>
        )}

        {/* Formulario de registro */}
        <View className="space-y-4">
          <MyInput
            control={control}
            name="email"
            rules={emailRules}
            type="email"
            placeholder={APP_STRINGS.AUTH.EMAIL_PLACEHOLDER}
            label={APP_STRINGS.AUTH.EMAIL_LABEL}
            trimSpaces={true}
          />

          <MyInput
            control={control}
            name="password"
            rules={passwordRules}
            type="password"
            placeholder={APP_STRINGS.AUTH.PASSWORD_PLACEHOLDER}
            label={APP_STRINGS.AUTH.PASSWORD_LABEL}
          />

          <MyInput
            control={control}
            name="confirmPassword"
            rules={repeatPasswordRules}
            type="password"
            placeholder={APP_STRINGS.AUTH.CONFIRM_PASSWORD_PLACEHOLDER}
            label={APP_STRINGS.AUTH.CONFIRM_PASSWORD_LABEL}
          />
        </View>

        {/* Botón de Sign Up - CORREGIDO */}
        <MyButton
          onPress={handleSubmit(onSubmit)} // ✅ Solo pasa la referencia, no la ejecución
          title={isLoading ? APP_STRINGS.AUTH.CREATING_ACCOUNT : APP_STRINGS.AUTH.SIGNUP_BTN}
          variant="primary"
          size="md"
          className="my-6"
          accessibilityLabel={APP_STRINGS.AUTH.SIGNUP_BTN}
          disabled={isLoading}
          loading={isLoading}
        />

        {/* Botón para ir a Login */}
        <View className="flex-row justify-center items-center">
          <Text className="text-neutral-600 text-base">
            {APP_STRINGS.AUTH.ALREADY_HAVE_ACCOUNT}
          </Text>
          <MyButton
            onPress={() => router.push('/login')}
            title={APP_STRINGS.AUTH.LOGIN_LINK}
            variant="text-gray"
            textClassName="text-primary-600 font-semibold"
            size="sm"
          />
        </View>
      </AuthLayout>
    </ImageLayout>
  );
}
