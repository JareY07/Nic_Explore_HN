import { View, Image, ImageBackground } from 'react-native';
import MyButton from '@/components/ui/myButton/MyButton';
import { useRouter } from 'expo-router';
import '../../../../global.css';
import { useAuthStore } from '../store/useAuth';
import { useAppStore } from '@/store/useAppStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const { setAuthFlow, resetAuthFlow } = useAuthStore();
  const { theme } = useAppStore();

  const backgroundImage =
    theme === 'dark'
      ? require('@/assets/images/GranadaBackground.jpg') // Imagen para dark mode
      : require('@/assets/images/BeachBackground.jpg'); // Imagen para light mode

  const handleLogin = () => {
    resetAuthFlow();
    router.push('/login');
  };

  const handleCreateAccount = () => {
    resetAuthFlow();
    setAuthFlow('createAccount');
    router.push('/signUp');
  };

  return (
    <ImageBackground className="h-full" source={backgroundImage}>
      <View>
        <Image
          resizeMode="contain"
          className="h-[170px] w-[300px] mt-[380px] mb-[100px]"
          source={require('@/assets/images/PresentationApp.png')}
        />
        {/* Botón de Iniciar sesión */}
        <MyButton
          onPress={handleLogin}
          variant="glass"
          title="Sign In"
          size="md"
          className="mx-10 mb-4"
          accessibilityLabel="Sign In"
        />

        {/* Botón de crear cuenta */}
        <MyButton
          onPress={handleCreateAccount}
          title="Create an account"
          variant="text"
          size="sm"
          className="mx-6"
        />
      </View>
    </ImageBackground>
  );
}
