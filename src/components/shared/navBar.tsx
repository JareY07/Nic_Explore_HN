import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useAppStore } from '@/store/useAppStore';

interface NavBarProps {
  items: string[];
  activeItem?: string;
  onItemPress?: (item: string) => void;
  initialActiveItem?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  items,
  activeItem: externalActiveItem,
  onItemPress,
  initialActiveItem = items[0],
}) => {
  const [internalActiveItem, setInternalActiveItem] = useState(initialActiveItem);
  const { theme } = useAppStore();

  // Usar el estado controlado externamente o internamente
  const activeItem = externalActiveItem !== undefined ? externalActiveItem : internalActiveItem;

  const handleItemPress = (item: string) => {
    if (onItemPress) {
      onItemPress(item);
    } else {
      setInternalActiveItem(item);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className={`px-2 py-3 mr-4`}>
      <View className="flex-row gap-4 m-4">
        {items.map((item, index) => (
          <Pressable
            key={index}
            className={`px-2 py-2 rounded-lg ${
              activeItem === item
                ? 'border-b-[4px] border-primary-500'
                : theme === 'dark'
                  ? 'bg-transparent'
                  : 'bg-transparent'
            }`}
            onPress={() => handleItemPress(item)}>
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
