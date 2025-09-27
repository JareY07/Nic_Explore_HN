import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import '../../../../global.css';
import React, { useEffect } from 'react';

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ChangePasswordScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: { password: '', confirmPassword: '' },
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

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

  const handleFormSubmit = handleSubmit((data: FormData) => {
    console.log('Form data:', data);
    console.log('cambiando contraseña...');
    router.replace('/login');
  });
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          backgroundColor: colors.neutral.white,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          paddingTop: 40,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text className="text-center text-xl font-bold text-primary-500 mb-4">
          Enter your new password
        </Text>
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
          placeholder="Your new password"
          errors={errors}
          label="New Password"
        />

        {/* Campo de confirmación de contraseña */}
        <MyInput
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Please confirm your password',
          }}
          type="password"
          placeholder="Confirm your password"
          errors={errors}
          label="Confirm Password"
        />

        {/* Botón para cambiar contraseña */}
        <MyButton
          onPress={handleFormSubmit}
          variant="primary"
          title="Change password"
          size="md"
          className="mx-10 mb-4"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
