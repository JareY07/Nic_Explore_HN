import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import React from 'react';
import '../../../../global.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import MyInput from '@/components/ui/myInput/MyInput';
import MyButton from '@/components/ui/myButton/MyButton';

type FormData = {
  email: string;
};

export default function EmailScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: '' },
  });
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // revisar si hay una cuenta con ese email
  };
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
          Enter your email
        </Text>
        <MyInput
          control={control}
          name="email"
          rules={{
            required: 'The email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email',
            },
          }}
          type="email"
          placeholder="your@email.com"
          errors={errors}
          label="Email"
          trimSpaces={true}
        />
        {/* Botón de Iniciar sesión */}
        <MyButton
          onPress={handleSubmit((data) => {
            onSubmit(data);
            router.replace('/codeSend');
          })}
          variant="primary"
          title="Send"
          size="md"
          className="mx-10 mb-4"
          accessibilityLabel="Send email"
        />
        {/* Botón de crear cuenta */}
        <MyButton
          onPress={() => {
            router.push('/signIn');
          }}
          title="Back to Log In"
          variant="text"
          size="md"
          className="mx-6"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
