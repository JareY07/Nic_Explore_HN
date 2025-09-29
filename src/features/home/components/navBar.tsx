import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useAppStore } from '@/app/store/useAppStore'; // Ajusta la ruta según tu estructura

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('Places');
  const { theme } = useAppStore();

  const navItems = ['Places', 'Hotels', 'Restaurants', 'Beaches', 'Transport'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className={`px-2 py-3 mr-4`}>
      <View className="flex-row gap-4 m-4">
        {navItems.map((item, index) => (
          <Pressable
            key={index}
            className={`px-2 py-2 rounded-lg ${
              activeItem === item
                ? 'border-b-[4px] border-primary-500'
                : theme === 'dark'
                  ? 'bg-transparent'
                  : 'bg-transparent'
            }`}
            onPress={() => setActiveItem(item)}>
            <Text
              className={`font-medium text-base ${
                activeItem === item
                  ? 'text-primary-500'
                  : theme === 'dark'
                    ? 'text-gray-300'
                    : 'text-gray-400'
              }`}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default NavBar;
