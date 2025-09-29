import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HealthTest from '@/test/unit/Health.test';
import { useAppStore } from '@/app/store/useAppStore';

const HomeScreen: React.FC = () => {
  const { theme } = useAppStore();

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className={`px-8 pt-10 pb-6 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
          <Text
            className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
            Prueba de Funcionamiento
          </Text>
          <Text className={`mt-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Verifica el estado del servidor y la aplicación
          </Text>
        </View>

        {/* Health Test Component */}
        <HealthTest />

        {/* Optional: Add some spacing at the bottom */}
        <View className="pb-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
