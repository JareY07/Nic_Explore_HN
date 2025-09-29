import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/app/store/useAppStore';
import NavBar from '../components/navBar';
import LocationCards from '../components/cards';
import TopLocationCards from '../components/topCards';
import { Location, TopLocation } from '@/types/locationTypes';

const HomeScreen: React.FC = () => {
  const { theme } = useAppStore();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

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
          saved: true,
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
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-white'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className={`${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-white'}`}>
          <NavBar />
          <LocationCards locations={locations} loading={loading} onSaveToggle={handleSaveToggle} />
          <TopLocationCards
            locations={mockTopLocations}
            onSaveToggle={(id, saved) => console.log(`Location ${id} saved: ${saved}`)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
