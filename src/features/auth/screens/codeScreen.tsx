import { Platform, ScrollView, Text, View, Image, ImageBackground, Keyboard } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '../store/useAuth';
import MyCodeInput from '@/components/ui/myInput/MyCodeInput';
import { useAppStore } from '@/app/store/useAppStore';

type FormData = {
  code: string;
};

export default function CodeScreen() {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { authFlow, resetAuthFlow } = useAuthStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { code: '' },
  });
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

  const verifyCode = async (code: string): Promise<boolean> => {
    // Aquí iría tu llamada a la API para verificar el código
    console.log('Verifying code:', code);

    // Simulación de verificación
    return new Promise((resolve) => {
      setTimeout(() => {
        // En un caso real, esto vendría de tu backend
        resolve(code === '123456'); // Código de ejemplo
      }, 1000);
    });
  };

  const onSubmit = async (data: FormData) => {
    console.log('Form data:', data);

    try {
      // Verificar el código antes de navegar
      const isValid = await verifyCode(data.code);

      if (isValid) {
        // Navegar según el flujo solo si el código es válido
        if (authFlow === 'forgotPassword') {
          router.replace('/changePassword');
        } else if (authFlow === 'createAccount') {
          resetAuthFlow();
          router.replace('/login');
        } else {
          router.replace('/login');
        }
      } else {
        // Manejar código inválido
        console.log('Código inválido');
        // Puedes mostrar un alert o manejar el error de otra forma
        alert('Código inválido. Por favor intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Error al verificar el código. Intenta nuevamente.');
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const codeRules = useMemo(
    () => ({
      required: 'Verification code is required',
      minLength: {
        value: 6,
        message: 'Code must be exactly 6 digits',
      },
      maxLength: {
        value: 6,
        message: 'Code must be exactly 6 digits',
      },
      pattern: {
        value: /^[0-9]{6}$/,
        message: 'Please enter a valid 6-digit code',
      },
    }),
    [],
  );

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
            Enter your verification code
          </Text>

          {/* Formulario */}
          <View>
            <MyCodeInput
              control={control}
              name="code"
              rules={codeRules}
              type="code"
              placeholder="Enter code"
              label="Verification Code"
            />

            {/* Botón de Send */}
            <MyButton
              onPress={handleFormSubmit}
              variant="primary"
              title="Verify Code"
              size="md"
              className="my-6"
              accessibilityLabel="Verify code"
            />

            {/* Botón de Resend Code */}
            <MyButton
              onPress={() => {
                console.log('Resending code...');
                alert('Código reenviado. Revisa tu correo.');
              }}
              title="Resend Code"
              variant="outline"
              size="md"
              className="mb-4"
            />
          </View>

          {/* Texto de ayuda opcional */}
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-neutral-600 text-base text-center">
              Did not receive the code? Check your spam folder or
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
