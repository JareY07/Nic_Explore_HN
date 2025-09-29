import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { TopLocation, TopLocationCardsProps } from '@/types/locationTypes';

const TopLocationCards: React.FC<TopLocationCardsProps> = ({
  locations,
  loading = false,
  onSaveToggle,
}) => {
  const { isDarkMode } = useTheme();

  if (loading) {
    return (
      <View
        className={`px-4 py-8 justify-center items-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
        <ActivityIndicator size="large" color={isDarkMode ? '#3b82f6' : '#2563eb'} />
        <Text className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Cargando destinos...
        </Text>
      </View>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <View
        className={`px-4 py-8 justify-center items-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
        <Text className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          No hay destinos disponibles
        </Text>
      </View>
    );
  }

  return (
    <View className={`px-4 py-3 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}>
      <Text className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Top Locations
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {locations.map((location) => (
          <TopLocationCard
            key={location.id}
            location={location}
            isDarkMode={isDarkMode}
            onSaveToggle={onSaveToggle}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Componente individual de card
const TopLocationCard: React.FC<{
  location: TopLocation;
  isDarkMode: boolean;
  onSaveToggle?: (id: number, saved: boolean) => void;
}> = ({ location, isDarkMode, onSaveToggle }) => (
  <View
    className="ml-4 rounded-2xl overflow-hidden border"
    style={{
      width: 200, // Más ancho que alto
      height: 80, // Compacto
      borderColor: isDarkMode ? '#374151' : '#e5e7eb',
    }}>
    <View className="flex-row h-full">
      {/* Imagen totalmente pegada a la izquierda */}
      <Image
        source={{ uri: location.image }}
        className="w-20 h-full" // Ancho fijo, alto completo
        resizeMode="cover"
      />

      {/* Contenido de texto - ocupa el resto del espacio */}
      <View className={`flex-1 justify-center px-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Text
          className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          numberOfLines={1} // Evita que el texto se corte en múltiples líneas
        >
          {location.name}
        </Text>
        <Text
          className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          numberOfLines={1}>
          {location.location}
        </Text>
      </View>
    </View>
  </View>
);

export default TopLocationCards;
