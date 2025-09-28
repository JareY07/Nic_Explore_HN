import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/ui/myButton/drawerBtn';
import { colors } from '@/theme/colors';
import { HomeIcon } from '@/components/icons/icons';

export default function drawerLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: colors.primary[500],
          drawerActiveTintColor: colors.primary[100],
          drawerPosition: 'right',
          swipeEdgeWidth: 50,
          headerShown: false,
        }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            headerShown: false,
            drawerIcon: ({ size, color }) => <HomeIcon size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
