import {
  Platform,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  Keyboard,
  Alert,
} from 'react-native';
import MyInput from '@/components/ui/myInput/MyInput';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { useAuthStore } from '../store/useAuth';
import { api } from '@/services/api/baseApi';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpStepTwoScreen() {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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

  const backgroundImage =
    theme === 'dark'
      ? require('@/assets/images/GranadaBackground.jpg')
      : require('@/assets/images/BeachBackground.jpg');

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

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Combina los datos de ambas pantallas
      const completeUserData = {
        ...signUpData, // Datos de la primera pantalla
        userMail: data.email,
        userPassword: data.password,
      };

      console.log('Datos completos para enviar a la API:', completeUserData);

      // Aquí haces la llamada a tu API
      const response = await api.post('/users/create', completeUserData);
      console.log('Registro exitoso:', response.data);

      clearSignUpData();

      // Navega a la siguiente pantalla
      router.push('/codeSend');
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'No se pudo completar el registro. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} className="flex-1" resizeMode="cover">
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
          className="w-full h-[80px] mb-4"
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
            Complete Your Registration
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

            <MyInput
              control={control}
              name="confirmPassword"
              rules={repeatPasswordRules}
              type="password"
              placeholder="Repeat password"
              label="Confirm Password"
            />
          </View>

          {/* Botón de Sign Up - CORREGIDO */}
          <MyButton
            onPress={handleSubmit(onSubmit)} // ✅ Solo pasa la referencia, no la ejecución
            title={isLoading ? 'Creating Account...' : 'Sign Up'}
            variant="primary"
            size="md"
            className="my-6"
            accessibilityLabel="Sign Up"
            disabled={isLoading}
            loading={isLoading}
          />

          {/* Botón para ir a Login */}
          <View className="flex-row justify-center items-center">
            <Text className="text-neutral-600 text-base">Already have an account?</Text>
            <MyButton
              onPress={() => router.push('/login')}
              title="Sign In"
              variant="text"
              size="sm"
              className="p-0 ml-1"
              textClassName="text-primary-800 font-semibold"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// ❌ ELIMINA ESTA FUNCIÓN - Ya no es necesaria
// function setIsLoading(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }
