import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import MyInput from '@/components/ui/myInput/MyInput';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import '../../../../global.css';
import React from 'react';

type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // Aquí iría la lógica de autenticación
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: colors.neutral.white,
            paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text className="text-center text-xl font-bold text-primary-500 mb-4">Register</Text>
          <MyInput
            control={control}
            name="username"
            rules={{
              required: 'Username is required',
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message: 'username must be coherent',
              },
            }}
            type="text"
            placeholder="Your username"
            errors={errors}
            label="Username"
            trimSpaces={true}
          />
          <MyInput
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            type="email"
            placeholder="your@email.com"
            errors={errors}
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
            errors={errors}
            label="Password"
          />
          <MyInput
            control={control}
            name="confirmPassword"
            rules={{
              required: 'The password is required',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            }}
            type="password"
            placeholder="Repeat password"
            errors={errors}
            label="Repeat password"
          />
          <MyButton
            onPress={handleSubmit((data) => {
              onSubmit(data);
              router.push('/codeSend');
            })}
            title="Sign Up"
            variant="primary"
            size="lg"
            className="mx-6 mb-4"
            accessibilityLabel="Sign Up"
          />
          <MyButton
            onPress={() => {
              router.push('/login');
            }}
            title="Already have an account? Sign In"
            variant="text"
            size="md"
            className="mx-6"
            accessibilityLabel="Sign In"
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
