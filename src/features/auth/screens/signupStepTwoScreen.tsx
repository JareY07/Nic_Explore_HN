import { Platform, ScrollView, Text, View, Image, ImageBackground, Keyboard } from 'react-native';
import MyInput from '@/components/ui/myInput/MyInput';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useAppStore } from '@/app/store/useAppStore';

type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpStepTwoScreen() {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
      ? require('@/assets/images/GranadaBackground.jpg') // Imagen para dark mode
      : require('@/assets/images/BeachBackground.jpg'); // Imagen para light mode

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

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
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
          {/* Título - ACTUALIZADO PARA DARK MODE */}
          <Text
            className={`text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-800'
            }`}>
            {' '}
            Create Account
          </Text>

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

          {/* Botón de Sign Up */}
          <MyButton
            onPress={handleSubmit((data) => {
              onSubmit(data);
              router.push('/codeSend');
            })}
            title="Sign Up"
            variant="primary"
            size="md"
            className="my-6"
            accessibilityLabel="Sign Up"
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
