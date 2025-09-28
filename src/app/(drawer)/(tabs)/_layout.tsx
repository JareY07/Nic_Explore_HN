import { Tabs } from 'expo-router';
import {
  HomeIcon,
  BookIcon,
  OrderIcon,
  UserIcon,
  CameraIcon,
  SearchIcon,
} from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Image, Pressable, View } from 'react-native';
import React from 'react';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View className="flex-row items-center mr-4">
            {/* Botón de búsqueda */}
            <Pressable
              onPress={() => console.log('Search pressed')}
              className="p-2 mr-2"
              accessibilityLabel="Search">
              <SearchIcon color={colors.neutral[400]} size={24} />
            </Pressable>

            {/* Botón de filtro */}
            <Pressable
              onPress={() => console.log('Filter pressed')}
              className="p-2"
              accessibilityLabel="Filter">
              <CameraIcon color={colors.neutral[400]} size={24} />
            </Pressable>

            {/* El botón del drawer */}
            <DrawerToggleButton />
          </View>
        ),
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.neutral[400],
        headerTitle: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <Image
            className="h-[50px] w-[180px] ml-4 mt-2"
            source={require('@/assets/images/Discover.png')}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
      />
      <Tabs.Screen
        name="liked"
        options={{ title: 'Liked', tabBarIcon: ({ color }) => <BookIcon color={color} /> }}
      />
      <Tabs.Screen
        name="feed"
        options={{ title: 'Feed', tabBarIcon: ({ color }) => <OrderIcon color={color} /> }}
      />
      <Tabs.Screen
        name="notification"
        options={{ title: 'Notifications', tabBarIcon: ({ color }) => <UserIcon color={color} /> }}
      />
    </Tabs>
  );
}
