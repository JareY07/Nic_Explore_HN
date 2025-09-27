import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HealthTest from '@/test/unit/Health.test';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-neutral-800">Prueba de Funcionamiento</Text>
        </View>
        <HealthTest />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
