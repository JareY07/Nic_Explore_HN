import { Text, View } from 'react-native';
import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import HomeLayout from '@/components/shared/layouts/homeLayout';
import { APP_STRINGS } from '@/constants/shared';

export default function FeedScreen() {
  const { theme } = useAppStore();
  return (
    <HomeLayout>
      <View className="mb-6">
        <Text
          className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
          {APP_STRINGS.HOME.FEED.TITLE}
        </Text>
        {/* Puedes añadir más contenido aquí */}
        <Text className={`mt-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {APP_STRINGS.HOME.FEED.SUBTITLE}
        </Text>
      </View>

      {/* Aquí puedes añadir más contenido de la pantalla Liked */}
      <View className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
        <Text className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>
          {APP_STRINGS.HOME.FEED.EMPTY_DESC}
        </Text>
      </View>
    </HomeLayout>
  );
}
