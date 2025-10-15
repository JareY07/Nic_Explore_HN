import { Platform, ScrollView, Text, View, Image, ImageBackground, Keyboard } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { control, handleSubmit, watch, setError, clearErrors } = useForm<FormData>({
    defaultValues: { password: '', confirmPassword: '' },
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const { theme } = useAppStore();

  const backgroundImage =
    theme === 'dark'
      ? require('@/assets/images/GranadaBackground.jpg') // Imagen para dark mode
      : require('@/assets/images/BeachBackground.jpg'); // Imagen para light mode

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

  const handleFormSubmit = handleSubmit((data: FormData) => {
    console.log('Form data:', data);
    console.log('cambiando contraseña...');
    router.replace('/login');
  });

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
        {!isKeyboardVisible && (
          <Image
            resizeMode="contain"
            className="w-full h-[80px] mb-8"
            source={require('@/assets/images/miniLogo.png')}
          />
        )}

        <View
          className={`w-full rounded-t-[40px] px-8 pt-10 pb-8 ${
            isKeyboardVisible ? 'min-h-[100%]' : 'min-h-[70%]'
          } ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
          {/* Título - ACTUALIZADO PARA DARK MODE */}
          <Text
            className={`text-3xl font-bold text-center mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-800'
            }`}>
            Enter your new password
          </Text>

          {/* Formulario */}
          <View>
            <MyInput
              control={control}
              name="password"
              rules={passwordRules}
              type="password"
              placeholder="Your new password"
              label="New Password"
            />

            {/* Campo de confirmación de contraseña */}
            <MyInput
              control={control}
              name="confirmPassword"
              rules={repeatPasswordRules}
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
            />

            {/* Botón para cambiar contraseña */}
            <MyButton
              onPress={handleFormSubmit}
              variant="primary"
              title="Change Password"
              size="md"
              className="my-6"
              accessibilityLabel="Change password"
            />
          </View>

          {/* Texto informativo opcional */}
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-neutral-600 text-base text-center">
              Make sure your new password is strong and secure
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
