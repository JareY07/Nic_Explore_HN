import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { useHomeData } from '../hooks/useHomeData';
import { useAppStore } from '@/app/store/useAppStore'; // Corregí la ruta

export default function HealthCheckComponent() {
  const { data, isLoading, error, refetch } = useHealthCheck();
  const homeStatus = useHomeData();
  const { theme } = useAppStore();

  console.log('HealthCheck data:', data);
  console.log('HealthCheck isLoading:', isLoading);
  console.log('HealthCheck error:', error);

  if (isLoading) {
    return (
      <View className="p-4 items-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#60a5fa' : '#2a5db0'} />
        <Text className={`mt-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
          Checking server health...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4 items-center">
        <Text className="text-status-error mb-2">Error: {error.message}</Text>
        <Button
          title="Retry"
          onPress={() => refetch()}
          color={theme === 'dark' ? '#60a5fa' : '#2a5db0'}
        />
      </View>
    );
  }

  return (
    <View className={`p-4 rounded-lg m-4 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
      <Text
        className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-neutral-800'
        }`}>
        Server Health Check
      </Text>

      <View className="mb-4">
        <Text className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}>
          Server Status: <Text className="text-status-success">{data?.status}</Text>
        </Text>
        <Text className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}>
          Environment: {data?.environment || 'N/A'}
        </Text>
        <Text className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}>
          Version: {data?.version || 'N/A'}
        </Text>
      </View>

      <View className="mb-4">
        <Text className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}>
          Zustand Status: <Text className="text-primary-500">{homeStatus}</Text>
        </Text>
      </View>
    </View>
  );
}
