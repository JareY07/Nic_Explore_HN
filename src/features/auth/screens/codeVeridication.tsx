import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import '../../../../global.css';
import React from 'react';

type FormData = {
  code: string;
};

export default function CodeScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { code: '' },
  });
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
    router.replace('/changePassword');
  });
  return (
    <KeyboardAvoidingView
      behavior="height"
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
          Enter your verifiation code
        </Text>
        <MyInput
          control={control}
          name="code"
          rules={{
            required: 'Verification code is required',
            minLength: {
              value: 6,
              message: 'Code must be 6 digits',
            },
            maxLength: {
              value: 6,
              message: 'Code must be 6 digits',
            },
            pattern: {
              value: /^[0-9]{6}$/,
              message: 'Please enter a valid 6-digit code',
            },
          }}
          type="code"
          placeholder="Enter code"
          errors={errors}
          label="Verification Code"
        />
        {/* Enviar codigo de verificación */}
        <MyButton
          onPress={handleFormSubmit}
          variant="primary"
          title="Send"
          size="md"
          className="mx-10 mb-4"
        />
        {/* Reenviar codigo */}
        <MyButton
          onPress={() => {
            console.log('123456');
          }}
          title="Resend Code"
          variant="outline"
          size="md"
          className="mx-10"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
