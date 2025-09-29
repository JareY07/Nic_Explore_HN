// features/test/SimpleTest.tsx
import React from 'react';
import { View, Text } from 'react-native';
import HealthCheckComponent from '@/features/home/components/HealthCheckComponent';
import { useHealthCheck } from '@/features/home/hooks/useHealthCheck';
import { useAppStore } from '@/app/store/useAppStore'; // Corregí la ruta

export default function HealthTest() {
  const { data } = useHealthCheck();
  const { theme } = useAppStore();

  return (
    <View
      className={`w-full rounded-t-[40px] px-8 pt-10 pb-8 ${
        theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
      }`}>
      <Text
        className={`text-3xl font-bold text-center mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-neutral-800'
        }`}>
        Estado: {data?.status || 'Who knows'}
      </Text>
      <HealthCheckComponent />
    </View>
  );
}
