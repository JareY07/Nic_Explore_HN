import { View, Text } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useAuthStore } from '../store/useAuth';
import { useAppStore } from '@/store/useAppStore';
import ImageLayout from '@/components/shared/layouts/imageLayout';
import AuthLayout from '@/components/shared/layouts/authLayout';

type FormData = {
  email: string;
};

export default function EmailScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '' },
  });
  const { setTempEmail, authFlow } = useAuthStore();
  const { theme } = useAppStore();

  const onSubmit = (data: FormData) => {
    setTempEmail(data.email);
    console.log('Datos del formulario:', data);
    router.replace('/codeSend');
  };

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

  const title = authFlow === 'forgotPassword' ? 'Recover your password' : 'Verify your email';

  return (
    <ImageLayout>
      <AuthLayout>
        {/* Título */}
        <Text
          className={`text-3xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-800'
          }`}>
          {title}
        </Text>
        {/* Formulario */}
        <View>
          <MyInput
            control={control}
            name="email"
            rules={emailRules}
            type="email"
            placeholder="your@email.com"
            label="Email"
            trimSpaces={true}
          />

          {/* Botón de Send */}
          <MyButton
            onPress={handleSubmit((data) => {
              onSubmit(data);
            })}
            variant="primary"
            title="Send"
            size="md"
            className="my-6"
            accessibilityLabel="Send email"
          />
        </View>
        {/* Botón de Back to Log In */}
        <View className="flex-row justify-center items-center">
          <Text className="text-neutral-600 text-base">Do not have an account?</Text>
          <MyButton
            onPress={() => router.push('/login')}
            title="Sign In"
            variant="text-gray"
            textClassName="text-primary-800 font-semibold"
            size="sm"
          />
        </View>
      </AuthLayout>
    </ImageLayout>
    //   </View>
    //   </ScrollView>
    // </ImageBackground>
  );
}
