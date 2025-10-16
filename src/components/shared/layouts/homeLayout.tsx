import { ScrollView } from 'react-native';
import { AuthProps } from '@/types/authTypes';
import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeLayout({ children }: AuthProps) {
  const { theme } = useAppStore();

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-white'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </SafeAreaView>
  );
}
