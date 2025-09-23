import { View } from 'react-native';
import React from 'react';
import MyButton from '@/components/ui/myButton/MyButton';
import '../../../../global.css';
import { useAuthStore } from '@/features/auth/store/useAuth';

export default function ProfileScreen() {
  const { logOut } = useAuthStore();
  return (
    <View className="flex-1 justify-center">
      <MyButton
        onPress={() => {
          logOut();
        }}
        title="Log Out"
        variant="outline"
        className="mx-6"
      />
    </View>
  );
}
