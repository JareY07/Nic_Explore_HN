import { Tabs, useRouter } from 'expo-router';
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
import { Image, Pressable, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/store/useAppStore';
import { APP_STRINGS } from '@/constants/shared';

export default function TabLayout() {
  const { theme } = useAppStore();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View className="flex-row items-center mr-4">
            <Pressable
              onPress={() => console.log('Search pressed')}
              className="p-2 mr-2"
              accessibilityLabel={APP_STRINGS.NAVIGATION.SEARCH}>
              <SearchIcon
                color={theme === 'dark' ? colors.neutral[300] : colors.neutral[400]}
                size={24}
              />
            </Pressable>

            <Pressable
              onPress={() => router.push('/features/camera')}
              className="p-2"
              accessibilityLabel={APP_STRINGS.NAVIGATION.FILTER}>
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
          title: APP_STRINGS.NAVIGATION.TAB_HOME,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <HomeIcon color={colors.neutral.white} size={focused ? 24 : 28} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />

      <Tabs.Screen
        name="liked"
        options={{
          title: APP_STRINGS.FAVORITES.TITLE,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <LikedIcon color={colors.neutral.white} size={focused ? 24 : 28} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />

      <Tabs.Screen
        name="feed"
        options={{
          title: APP_STRINGS.DRAWER.INFO_TITLE,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <EditIcon color={colors.neutral.white} size={focused ? 24 : 28} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />

      <Tabs.Screen
        name="addPost"
        options={{
          title: APP_STRINGS.NAVIGATION.TAB_HOME,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center ${
                focused ? 'flex-row bg-white/30 rounded-[15px] w-[80px] h-[40px]' : ''
              }`}>
              <AddIcon color={colors.neutral.white} size={focused ? 24 : 28} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (focused ? null : <View style={{ width: 0, height: 0 }} />),
        }}
      />
    </Tabs>
  );
}
