// components/ui/myButton/drawerBtn.tsx
import { useAuthStore } from '@/features/auth/store/useAuth';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  LeaveIcon,
  SettingsIcon,
  LockIcon,
  CreditCardIcon,
  BellIcon,
  GlobeIcon,
  MoonIcon,
  HelpIcon,
  InfoIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import ToggleSwitch from '@/components/ui/myButton/ToggleSwitch'; // Corregí la ruta
import { useAppStore } from '@/store/useAppStore'; // Corregí la ruta
import { APP_STRINGS } from '@/constants/shared';

export default function CustomDrawerContent(props: any) {
  const { logOut } = useAuthStore();
  const router = useRouter();

  // Estado para controlar el submenú de lenguaje
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Estado para el dark mode
  const { theme, toggleTheme } = useAppStore();

  const handleNavigation = (route: string) => {
    props.navigation.closeDrawer();
    setTimeout(() => {
      router.push(route);
    }, 300);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setLanguageMenuOpen(false);
    console.log('Idioma seleccionado:', language);
  };

  const handleDarkModeToggle = () => {
    toggleTheme();
  };

  // Función para determinar colores de texto
  const getTextColor = () => (theme === 'dark' ? 'text-white' : 'text-neutral-700');
  const getSecondaryTextColor = () => (theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600');
  const getBorderColor = () => (theme === 'dark' ? 'border-neutral-700' : 'border-neutral-100');
  const getActiveBgColor = () =>
    theme === 'dark' ? 'active:bg-neutral-700' : 'active:bg-neutral-50';
  const getSubmenuBgColor = () => (theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-50');
  const getSubmenuBorderColor = () =>
    theme === 'dark' ? 'border-neutral-600' : 'border-neutral-200';

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={true}
      contentContainerStyle={{
        backgroundColor: theme === 'dark' ? colors.neutral[900] : '#ffffff',
        flexGrow: 1,
      }}
      style={{ backgroundColor: theme === 'dark' ? colors.neutral[900] : '#ffffff' }}>
      {/* Header */}
      <View
        className={`p-6 border-b ${theme === 'dark' ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-200 bg-primary-50'}`}>
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-primary-500 rounded-full justify-center items-center mr-3">
            <Text className="text-white font-bold text-lg">{APP_STRINGS.DRAWER.DEMO_INITIALS}</Text>
          </View>
          <View>
            <Text className={`text-lg font-bold ${getTextColor()}`}>
              {APP_STRINGS.DRAWER.DEMO_USER}
            </Text>
            <Text className={`text-sm ${getSecondaryTextColor()}`}>
              {APP_STRINGS.DRAWER.DEMO_ROLE}
            </Text>
          </View>
        </View>
      </View>

      {/* Sección Settings */}
      <View className="p-4">
        <Text
          className={`text-sm font-semibold uppercase tracking-wider mb-3 px-2 ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
          {APP_STRINGS.DRAWER.FEATURES_TITLE}
        </Text>

        <View
          className={`rounded-2xl border overflow-hidden ${
            theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          }`}>
          {/* Profile Details */}
          <Pressable
            onPress={() => handleNavigation('/settings/profileDetails')}
            className={`flex-row items-center px-4 py-3 border-b ${getBorderColor()} ${getActiveBgColor()}`}>
            <SettingsIcon
              size={20}
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
            <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
              {APP_STRINGS.PROFILE.TITLE}
            </Text>
          </Pressable>

          {/* Password */}
          <Pressable
            onPress={() => handleNavigation('/settings/password')}
            className={`flex-row items-center px-4 py-3 border-b ${getBorderColor()} ${getActiveBgColor()}`}>
            <LockIcon
              size={20}
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
            <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
              {APP_STRINGS.PROFILE.CHANGE_PASSWORD}
            </Text>
          </Pressable>

          {/* Payment method */}
          <Pressable
            onPress={() => handleNavigation('/settings/paymentMethod')}
            className={`flex-row items-center px-4 py-3 border-b ${getBorderColor()} ${getActiveBgColor()}`}>
            <CreditCardIcon
              size={20}
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
            <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
              {APP_STRINGS.DRAWER.PAYMENT_METHOD}
            </Text>
          </Pressable>

          {/* Notifications */}
          <Pressable
            onPress={() => handleNavigation('/settings/notifications')}
            className={`flex-row items-center px-4 py-3 border-b ${getBorderColor()} ${getActiveBgColor()}`}>
            <BellIcon
              size={20}
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
            <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
              {APP_STRINGS.NOTIFICATIONS.TITLE}
            </Text>
          </Pressable>

          {/* Language - SUBMENÚ */}
          <View className={`border-b ${getBorderColor()}`}>
            <Pressable
              onPress={() => setLanguageMenuOpen(!languageMenuOpen)}
              className={`flex-row items-center justify-between px-4 py-3 ${getActiveBgColor()}`}>
              <View className="flex-row items-center flex-1">
                <GlobeIcon
                  size={20}
                  color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
                />
                <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
                  {APP_STRINGS.DRAWER.LANGUAGE}
                </Text>
              </View>
              {languageMenuOpen ? (
                <ChevronUpIcon
                  size={16}
                  color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
                />
              ) : (
                <ChevronDownIcon
                  size={16}
                  color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
                />
              )}
            </Pressable>

            {/* Submenú de lenguaje */}
            {languageMenuOpen && (
              <View className={`border-t ${getSubmenuBorderColor()} ${getSubmenuBgColor()}`}>
                {/* Opción English */}
                <Pressable
                  onPress={() => handleLanguageSelect('en')}
                  className={`flex-row items-center justify-between px-4 py-3 pl-12 ${getActiveBgColor()}`}>
                  <Text className={`font-medium ${getTextColor()}`}>
                    {APP_STRINGS.LANG.ENGLISH}
                  </Text>
                  {selectedLanguage === 'en' && <CheckIcon size={16} color={colors.primary[500]} />}
                </Pressable>

                {/* Opción Español */}
                <Pressable
                  onPress={() => handleLanguageSelect('es')}
                  className={`flex-row items-center justify-between px-4 py-3 pl-12 ${getActiveBgColor()}`}>
                  <Text className={`font-medium ${getTextColor()}`}>
                    {APP_STRINGS.LANG.SPANISH}
                  </Text>
                  {selectedLanguage === 'es' && <CheckIcon size={16} color={colors.primary[500]} />}
                </Pressable>
              </View>
            )}
          </View>

          {/* Dark mode - TOGGLE */}
          <View className={`flex-row items-center justify-between px-4 py-3 ${getActiveBgColor()}`}>
            <View className="flex-row items-center flex-1">
              <MoonIcon
                size={20}
                color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
              />
              <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
                {APP_STRINGS.DRAWER.DARK_MODE}
              </Text>
            </View>
            <ToggleSwitch isEnabled={theme === 'dark'} onToggle={handleDarkModeToggle} size="md" />
          </View>
        </View>
      </View>

      {/* Sección Info */}
      <View className="p-4">
        <Text
          className={`text-sm font-semibold uppercase tracking-wider mb-3 px-2 ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
          {APP_STRINGS.DRAWER.INFO_TITLE}
        </Text>

        <View
          className={`rounded-2xl border overflow-hidden ${
            theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          }`}>
          {/* About us */}
          <Pressable
            onPress={() => handleNavigation('/aboutUs')}
            className={`flex-row items-center px-4 py-3 border-b ${getBorderColor()} ${getActiveBgColor()}`}>
            <InfoIcon
              size={20}
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
            <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
              {APP_STRINGS.DRAWER.ABOUT_US}
            </Text>
          </Pressable>

          {/* Help */}
          <Pressable
            onPress={() => handleNavigation('/help')}
            className={`flex-row items-center px-4 py-3 border-b ${getBorderColor()} ${getActiveBgColor()}`}>
            <HelpIcon
              size={20}
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
            <Text className={`ml-3 font-medium flex-1 ${getTextColor()}`}>
              {APP_STRINGS.DRAWER.HELP}
            </Text>
          </Pressable>

          {/* Log out */}
          <Pressable
            onPress={logOut}
            className={`flex-row items-center px-4 py-3 ${theme === 'dark' ? 'active:bg-red-900/30' : 'active:bg-red-50'}`}>
            <LeaveIcon size={20} color={colors.status.error} />
            <Text className="ml-3 text-red-600 font-medium flex-1">
              {APP_STRINGS.PROFILE.LOGOUT}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Footer/Spacer */}
      <View className="p-4">
        <Text
          className={`text-xs text-center ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
          Nic Explore
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}
