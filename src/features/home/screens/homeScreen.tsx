import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/app/store/useAppStore';
import NavBar from '../components/navBar';

const HomeScreen: React.FC = () => {
  const { theme } = useAppStore();

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-white'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className={`${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-white'}`}>
          <NavBar />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
