import { ScrollView, View, ViewStyle } from 'react-native';
import { AuthProps } from '@/types/authTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useTheme } from '@/components/hooks/useTheme';

interface MyLayoutProps extends AuthProps {
  scrollable?: boolean;
}

export default function MyLayout({ children, scrollable = true }: MyLayoutProps) {
  const { theme: appTheme } = useTheme();

  const containerStyle: ViewStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView
      className={`flex-1 ${appTheme.mode === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      {scrollable ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView>
      ) : (
        <View style={containerStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}
