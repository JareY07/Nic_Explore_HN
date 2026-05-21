import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import NavBar from '../../../components/shared/navBar';
import LocationCards from '../components/cards';
import TopLocationCards from '../components/topCards';
import { Location, TopLocation } from '@/types/locationTypes';
import HomeLayout from '@/components/shared/layouts/homeLayout';
import { useTranslation } from 'react-i18next';
import { APP_STRINGS } from '@/constants/shared';

const HomeScreen: React.FC = () => {
  const { theme } = useAppStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const mockTopLocations: TopLocation[] = [
    {
      id: 1,
      image: 'https://i.pinimg.com/736x/f4/99/e4/f499e42fb5310be3fe24bd293c1cd6e7.jpg',
      name: 'SELVA NEGRA',
      location: 'Matagalpa',
      rating: 4.5,
      saved: false,
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/736x/b9/b8/ad/b9b8ad9e76a78ab66e8926109a0e2e2c.jpg',
      name: 'CATEDRAL',
      location: 'Granada',
      rating: 4.7,
      saved: true,
    },
  ];

  useEffect(() => {
    // Simular fetch de API
    setTimeout(() => {
      const mockLocations: Location[] = [
        {
          id: 1,
          name: 'LEON',
          distance: '65 km',
          temperature: '28°C',
          description: 'Sunny',
          rating: 4.5,
          saved: false,
          image: 'https://i.pinimg.com/1200x/b6/65/b7/b665b7c017de10634e34cf4b9f455fa3.jpg',
        },
        {
          id: 2,
          name: 'OMETEPE',
          distance: '35 km',
          temperature: '30°C',
          description: 'Cloudy',
          rating: 4.2,
          saved: false,
          image: 'https://i.pinimg.com/1200x/b1/79/7f/b1797f38febbfed3347cd82b22fee272.jpg',
        },
      ];
      setLocations(mockLocations);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSaveToggle = (id: number, saved: boolean) => {
    setLocations((prev) => prev.map((loc) => (loc.id === id ? { ...loc, saved } : loc)));
  };

  return (
    <HomeLayout>
      {/* Header Section */}
      <View className={`${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-white'}`}>
        <Text className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {t('home.title')}
        </Text>
      </View>
      <View className="flex-1">
        <NavBar
          items={[
            APP_STRINGS.HOME.NAV.PLACES,
            APP_STRINGS.HOME.NAV.HOTELS,
            APP_STRINGS.HOME.NAV.RESTAURANTS,
            APP_STRINGS.HOME.NAV.BEACHES,
            APP_STRINGS.HOME.NAV.TRANSPORTS,
          ]}
        />
        <LocationCards locations={locations} loading={loading} onSaveToggle={handleSaveToggle} />
        <TopLocationCards
          locations={mockTopLocations}
          onSaveToggle={(id, saved) => console.log(`Location ${id} saved: ${saved}`)}
        />
      </View>
    </HomeLayout>
  );
};

export default HomeScreen;
