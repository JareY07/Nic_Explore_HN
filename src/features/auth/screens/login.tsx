import {
  Platform,
  ScrollView,
  //   Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import MyInput from '@/components/ui/myInput/MyInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import '../../../../global.css';
import { useAuthStore } from '../store/useAuth';

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { logIn } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: FormData) => {
    console.log('Datos del formulario:', data);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('@/assets/images/BeachBackground.jpg')}
          className="flex-1"
          resizeMode="cover">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* <Image
              resizeMode="contain"
              className="w-full h-[300px]"
              source={require('@/assets/images/LogoRestaurant.png')}
            /> */}
            <MyInput
              control={control}
              name="email"
              rules={{
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
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
            {/* Botón de Contraseña olvidada */}
            <MyButton
              onPress={() => {
                router.push('/emailSend');
              }}
              title="Did you forget your password?"
              variant="text"
              size="sm"
              className="mx-6 mb-2"
            />
            {/* Botón de Iniciar sesión */}
            <MyButton
              onPress={handleSubmit((data) => {
                onSubmit(data);
                logIn();
              })}
              variant="glass"
              title="Log In"
              size="md"
              className="mx-10 mb-4"
              accessibilityLabel="Iniciar sesión"
            />

            {/* Botón de crear cuenta */}
            <MyButton
              onPress={() => {
                router.push('/signUp');
              }}
              title="¿No tienes una cuenta? Crea una"
              variant="text"
              className="mx-6"
              size="sm"
            />
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
