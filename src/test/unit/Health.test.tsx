// features/test/SimpleTest.tsx
import React from 'react';
import { View, Text } from 'react-native';
import HealthCheckComponent from '@/features/home/components/HealthCheckComponent';
import { useHealthCheck } from '@/features/home/hooks/useHealthCheck';

export default function HealthTest() {
  const { data } = useHealthCheck();

  return (
    <View className="p-4 bg-gray-100 rounded-lg m-4">
      <Text className="my-2">Estado: {data?.status || 'Who knows'}</Text>
      <HealthCheckComponent />
    </View>
  );
}
