import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { LocationCardsProps, Location } from '@/types/locationTypes';
import { HeartEmptyIcon, HeartFilledIcon } from '@/components/icons/icons';
import { colors } from '@/theme/colors';

const LocationCards: React.FC<LocationCardsProps> = ({
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {locations.map((location) => (
          <LocationCard
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
const LocationCard: React.FC<{
  location: Location;
  isDarkMode: boolean;
  onSaveToggle?: (id: number, saved: boolean) => void;
}> = ({ location, isDarkMode, onSaveToggle }) => (
  <View
    className="ml-8 rounded-3xl overflow-hidden"
    style={{
      width: 200,
      height: 300,
    }}>
    {/* ImageBackground como contenedor principal */}
    <ImageBackground
      source={{ uri: location.image || 'https://via.placeholder.com/280x200' }}
      resizeMode="cover"
      className="w-full h-full">
      {/* Overlay gradient para mejor legibilidad */}
      <View className="absolute inset-0 bg-black opacity-20" />

      {/* Heart button - Esquina superior derecha */}
      <Pressable
        className="absolute top-2 right-3 z-10"
        onPress={() => onSaveToggle?.(location.id, !location.saved)}>
        <View className={`p-2 rounded-full bg-transparent`}>
          <View className={'bg-transparent'}>
            {location.saved ? (
              <HeartFilledIcon color={colors.neutral.white} size={32} />
            ) : (
              <HeartEmptyIcon color={colors.neutral.white} size={32} />
            )}
          </View>
        </View>
      </Pressable>
      {/* Content container - Bottom */}
      <View className="flex-1 justify-end">
        {/* White view con rating que sobresale */}
        <View
          className={`mx-3 mb-3 rounded-2xl ${isDarkMode ? 'bg-gray-800/90' : 'bg-neutral-white'}`}>
          <View className="p-2">
            {/* Rating que sobresale hacia arriba */}
            <View
              className={`absolute -top-3 right-4 flex-row items-center px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-800/90' : 'bg-neutral-white'
              }`}>
              <Text
                className={`text-white text-xs font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                ⭐ {location.rating}
              </Text>
            </View>

            {/* Nombre */}
            <Text
              className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {location.name}
            </Text>

            {/* Distancia */}
            <Text className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {location.distance} from this location
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default LocationCards;
