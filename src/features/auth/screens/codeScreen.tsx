import { Text, View } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import React, { useMemo } from 'react';
import { useAuthStore } from '../store/useAuth';
import MyCodeInput from '@/components/ui/myInput/MyCodeInput';
import { useAppStore } from '@/store/useAppStore';
import ImageLayout from '@/components/shared/layouts/imageLayout';
import AuthLayout from '@/components/shared/layouts/authLayout';
import { APP_STRINGS } from '@/constants/shared';

type FormData = {
  code: string;
};

export default function CodeScreen() {
  const router = useRouter();
  const { authFlow, resetAuthFlow } = useAuthStore();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { code: '' },
  });
  const { theme } = useAppStore();

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
    <ImageLayout>
      <AuthLayout>
        {/* Título*/}
        <Text
          className={`text-3xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-800'
          }`}>
          {APP_STRINGS.AUTH.VERIFY_CODE_HEADING}
        </Text>

        {/* Formulario */}
        <View>
          <MyCodeInput
            control={control}
            name="code"
            rules={codeRules}
            type="code"
            placeholder={APP_STRINGS.AUTH.CODE_PLACEHOLDER}
            label={APP_STRINGS.AUTH.CODE_LABEL}
          />

          {/* Botón de Send */}
          <MyButton
            onPress={handleFormSubmit}
            variant="primary"
            title={APP_STRINGS.AUTH.VERIFY_CODE_BTN}
            size="md"
            className="my-6"
            accessibilityLabel={APP_STRINGS.AUTH.VERIFY_CODE_BTN}
          />

          {/* Botón de Resend Code */}
          <MyButton
            onPress={() => {
              console.log('Resending code...');
              alert('Código reenviado. Revisa tu correo.');
            }}
            title={APP_STRINGS.AUTH.RESEND_CODE}
            variant="outline"
            size="md"
            className="mb-4"
          />
        </View>

        {/* Texto de ayuda opcional */}
        <View className="flex-row justify-center items-center mt-4">
          <Text className="text-neutral-600 text-base text-center">
            {APP_STRINGS.AUTH.VERIFY_CODE_SUBTITLE}
          </Text>
        </View>
      </AuthLayout>
    </ImageLayout>
  );
}
