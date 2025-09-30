import { Tabs } from 'expo-router';
import {
  HomeIcon,
  LikedIcon,
  EditIcon,
  CameraIcon,
  SearchIcon,
  AddIcon,
} from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Image, Pressable, View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/app/store/useAppStore';

export default function TabLayout() {
  const { theme } = useAppStore();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View className="flex-row items-center mr-4">
            <Pressable
              onPress={() => console.log('Search pressed')}
              className="p-2 mr-2"
              accessibilityLabel="Search">
              <SearchIcon
                color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
                size={24}
              />
            </Pressable>

            <Pressable
              onPress={() => console.log('Opening Camera')}
              className="p-2"
              accessibilityLabel="Filter">
              <CameraIcon
                color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
                size={24}
              />
            </Pressable>

            <DrawerToggleButton
              tintColor={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
            />
          </View>
        ),
        tabBarActiveTintColor: colors.neutral.white,
        tabBarInactiveTintColor: colors.neutral.white,
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme === 'dark' ? colors.neutral[900] : colors.neutral.white, // Header que combina con el gradiente
        },
        headerLeft: () => (
          <Image
            className="h-[50px] w-[180px] ml-4 mt-2"
            source={require('@/assets/images/Discover.png')}
          />
        ),
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={theme === 'dark' ? ['#1F6161', '#05304C'] : ['#1f8e73ff', '#1F6161', '#05304C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
            }}
          />
        ),
        tabBarItemStyle: {
          borderRadius: 25,
          marginHorizontal: 10,
          marginVertical: 10,
          height: 50,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <HomeIcon color={colors.neutral.white} size={focused ? 24 : 28} />
              {focused && <Text className="text-white font-medium ml-2 text-sm">Home</Text>}
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />

      <Tabs.Screen
        name="liked"
        options={{
          title: 'Liked',
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <LikedIcon color={colors.neutral.white} size={focused ? 24 : 28} />
              {focused && <Text className="text-white font-medium ml-2 text-sm">Liked</Text>}
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />

      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <EditIcon color={colors.neutral.white} size={focused ? 24 : 28} />
              {focused && <Text className="text-white font-medium ml-2 text-sm">Feed</Text>}
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />

      <Tabs.Screen
        name="addPost"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <AddIcon color={colors.neutral.white} size={focused ? 24 : 28} />
              {focused && <Text className="text-white font-medium ml-2 text-sm">Add</Text>}
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />
    </Tabs>
  );
}
