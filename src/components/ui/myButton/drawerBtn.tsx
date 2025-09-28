// components/ui/myButton/drawerBtn.tsx
import { useAuthStore } from '@/features/auth/store/useAuth';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  LeaveIcon,
  SettingsIcon,
  UserIcon,
  LockIcon,
  CreditCardIcon,
  BellIcon,
  GlobeIcon,
  MoonIcon,
  HelpIcon,
  InfoIcon,
} from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomDrawerContent(props: any) {
  const { logOut } = useAuthStore();
  const router = useRouter();

  const handleNavigation = (route: string) => {
    // Cerrar drawer primero
    props.navigation.closeDrawer();
    // Navegar después de un pequeño delay
    setTimeout(() => {
      router.push(route);
    }, 300);
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{
        backgroundColor: '#ffffff',
        flexGrow: 1,
      }}
      style={{ backgroundColor: '#ffffff' }}>
      {/* Header con información del usuario */}
      <View className="p-6 border-b border-neutral-200 bg-primary-50">
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-primary-500 rounded-full justify-center items-center mr-3">
            <Text className="text-white font-bold text-lg">U1</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-neutral-800">User 1</Text>
            <Text className="text-sm text-neutral-600">Basic User</Text>
          </View>
        </View>
      </View>

      {/* Sección Settings */}
      <View className="p-4">
        <Text className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
          Settings
        </Text>

        <View className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {/* Other settings - RUTA: /settings */}
          <Pressable
            onPress={() => handleNavigation('/settings')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <SettingsIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Other settings</Text>
          </Pressable>

          {/* Profile details - RUTA: /profile */}
          <Pressable
            onPress={() => handleNavigation('/profile')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <UserIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Profile details</Text>
          </Pressable>

          {/* Password - RUTA: /change-password */}
          <Pressable
            onPress={() => handleNavigation('/change-password')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <LockIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Password</Text>
          </Pressable>

          {/* Payment method - RUTA: /payment-method */}
          <Pressable
            onPress={() => handleNavigation('/payment-method')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <CreditCardIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Payment method</Text>
          </Pressable>

          {/* Notifications - RUTA: /notifications-settings */}
          <Pressable
            onPress={() => handleNavigation('/notifications-settings')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <BellIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Notifications</Text>
          </Pressable>

          {/* Language - RUTA: /language */}
          <Pressable
            onPress={() => handleNavigation('/language')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <GlobeIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Language</Text>
          </Pressable>

          {/* Dark mode - RUTA: /theme */}
          <Pressable
            onPress={() => handleNavigation('/theme')}
            className="flex-row items-center px-4 py-3 active:bg-neutral-50">
            <MoonIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Dark mode</Text>
          </Pressable>
        </View>
      </View>

      {/* Sección Top Desti / About us */}
      <View className="p-4">
        <Text className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
          Top Desti
        </Text>

        <View className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {/* About us - RUTA: /about */}
          <Pressable
            onPress={() => handleNavigation('/about')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <InfoIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">About us</Text>
          </Pressable>

          {/* Help - RUTA: /help */}
          <Pressable
            onPress={() => handleNavigation('/help')}
            className="flex-row items-center px-4 py-3 border-b border-neutral-100 active:bg-neutral-50">
            <HelpIcon size={20} color={colors.neutral[400]} />
            <Text className="ml-3 text-neutral-700 font-medium flex-1">Help</Text>
          </Pressable>

          {/* Log out */}
          <Pressable onPress={logOut} className="flex-row items-center px-4 py-3 active:bg-red-50">
            <LeaveIcon size={20} color={colors.status.error} />
            <Text className="ml-3 text-red-600 font-medium flex-1">Log out</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer/Spacer */}
      <View className="p-4">
        <Text className="text-xs text-neutral-400 text-center">Nic Explore</Text>
      </View>
    </DrawerContentScrollView>
  );
}
