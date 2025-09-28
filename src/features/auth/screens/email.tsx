import { Platform, ScrollView, View, Image, Text, ImageBackground, Keyboard } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '../store/useAuth';

type FormData = {
  email: string;
};

export default function EmailScreen() {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '' },
  });
  const { setTempEmail, authFlow } = useAuthStore();

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
    <ImageBackground
      source={require('@/assets/images/BeachBackground.jpg')}
      className="flex-1"
      resizeMode="cover">
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
          className={`bg-white w-full rounded-t-[40px] px-8 pt-10 pb-8 ${isKeyboardVisible ? 'min-h-[60%]' : 'min-h-[40%]'}`}>
          {/* Título */}
          <Text className="text-3xl font-bold text-center text-neutral-800 mb-2">{title}</Text>

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
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
