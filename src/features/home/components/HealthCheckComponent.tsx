import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { useHomeData } from '../hooks/useHomeData';

export default function HealthCheckComponent() {
  const { data, isLoading, error, refetch } = useHealthCheck();
  const homeStatus = useHomeData();

  console.log('HealthCheck data:', data);
  console.log('HealthCheck isLoading:', isLoading);
  console.log('HealthCheck error:', error);

  if (isLoading) {
    return (
      <View className="p-4 items-center">
        <ActivityIndicator size="large" color="#2a5db0" />
        <Text className="text-neutral-400 mt-2">Checking server health...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4 items-center">
        <Text className="text-status-error">Error: {error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} color="#2a5db0" />
      </View>
    );
  }

  return (
    <View className="p-4 bg-neutral-50 rounded-lg m-4">
      <Text className="text-lg font-semibold text-neutral-800 mb-2">Server Health Check</Text>

      <View className="mb-4">
        <Text className="text-neutral-600">
          Server Status: <Text className="text-status-success">{data?.status}</Text>
        </Text>
        <Text className="text-neutral-600">Environment: {data?.environment || 'N/A'}</Text>
        <Text className="text-neutral-600">Version: {data?.version || 'N/A'}</Text>
      </View>

      <View className="mb-4">
        <Text className="text-neutral-600">
          Zustand Status: <Text className="text-primary-500">{homeStatus}</Text>
        </Text>
      </View>
    </View>
  );
}
