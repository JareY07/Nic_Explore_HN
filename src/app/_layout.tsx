// app/_layout.tsx
import 'expo-router/entry';
import { Stack } from 'expo-router';
import { Providers } from '@/providers/homeProvider';
import '../../global.css';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/features/auth/store/useAuth';
import { useAppStore } from '@/app/store/useAppStore';
import { View } from 'react-native';

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const { theme } = useAppStore();

  return (
    <Providers>
      {/* Aplicar la clase dark al contenedor principal basado en el tema */}
      <View className={`flex-1 ${theme === 'dark' ? 'dark' : ''}`}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(drawer)" options={{ headerShown: false, animation: 'none' }} />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
          </Stack.Protected>
        </Stack>
      </View>
    </Providers>
  );
}
