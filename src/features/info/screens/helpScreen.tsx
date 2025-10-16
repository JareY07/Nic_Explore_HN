import { Text, View } from 'react-native';
import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import HomeLayout from '@/components/shared/layouts/homeLayout';

export default function HelpScreen() {
  const { theme } = useAppStore();

  return (
    <HomeLayout>
      <View className="mb-6">
        <Text
          className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
          Prueba de Funcionamiento liked
        </Text>
        {/* Puedes añadir más contenido aquí */}
        <Text className={`mt-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Esta es la pantalla de elementos que te gustan
        </Text>
      </View>

      {/* Aquí puedes añadir más contenido de la pantalla Liked */}
      <View className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
        <Text className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>
          Tus elementos guardados aparecerán aquí
        </Text>
      </View>
    </HomeLayout>
  );
}
