import { Tabs } from 'expo-router';
import { HomeIcon, BookIcon, OrderIcon, UserIcon } from '@/components/icons/icons';
import { colors } from '@/theme/colors';
import { DrawerToggleButton } from '@react-navigation/drawer';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />,
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.neutral[400],
      }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: 'Menu', tabBarIcon: ({ color }) => <BookIcon color={color} /> }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: 'Orders', tabBarIcon: ({ color }) => <OrderIcon color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <UserIcon color={color} /> }}
      />
    </Tabs>
  );
}
