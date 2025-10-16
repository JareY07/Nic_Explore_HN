import { Text, View } from 'react-native';
import MyInput from '@/components/ui/myInput/MyInput';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useMemo } from 'react';
import { useAuthStore } from '../store/useAuth';
import { AppleIcon, FacebookIcon, GoogleIcon, XIcon } from '@/components/icons/icons';
import { useAppStore } from '@/store/useAppStore';
import AuthLayout from '@/components/shared/layouts/authLayout';
import ImageLayout from '@/components/shared/layouts/imageLayout';

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const { setAuthFlow, setSignUpData } = useAuthStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
    },
  });
  const { theme } = useAppStore();

  const firstNameRules = useMemo(
    () => ({
      required: 'First name is required',
    }),
    [],
  );

  const lastNameRules = useMemo(
    () => ({
      required: 'Last name is required',
    }),
    [],
  );

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

  const handleSignUp = (data: FormData) => {
    // Guarda los datos en el store ANTES de navegar
    setSignUpData({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    });

    setAuthFlow('createAccount');
    router.push('/signUpStepTwo');
  };

  return (
    <ImageLayout>
      <AuthLayout>
        {/* Título - ACTUALIZADO PARA DARK MODE */}
        <Text
          className={`text-3xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-800'
          }`}>
          Create Account
        </Text>

        {/* Formulario de registro */}
        <View className="space-y-4">
          <MyInput
            control={control}
            name="firstName"
            rules={firstNameRules}
            type="text"
            placeholder="Your first name"
            label="First Name"
            trimSpaces={true}
          />

          <MyInput
            control={control}
            name="lastName"
            rules={lastNameRules}
            type="text"
            placeholder="Your last name"
            label="Last Name"
            trimSpaces={true}
          />

          <MyInput
            control={control}
            name="username"
            rules={usernameRules}
            type="text"
            placeholder="Your username"
            label="Username"
            trimSpaces={true}
          />
        </View>

        {/* Botón de Sign Up */}
        <MyButton
          onPress={handleSubmit(handleSignUp)}
          title="Next"
          variant="primary"
          size="md"
          className="my-6"
          accessibilityLabel="Sign Up"
        />
        {/* Separador con texto "sign in with" */}
        <View className="flex-row items-center justify-center mb-6">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text className="mx-4 text-neutral-500 text-sm font-medium">or sign up with</Text>
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
        {/* Botón para ir a Login */}
        <View className="flex-row justify-center items-center">
          <Text className="text-neutral-600 text-base">Already have an account?</Text>
          <MyButton
            onPress={() => router.push('/login')}
            title="Sign in"
            variant="text-gray"
            textClassName="text-primary-600 font-semibold"
            size="sm"
          />
        </View>
      </AuthLayout>
    </ImageLayout>
  );
}
