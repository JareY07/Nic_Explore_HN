import { Keyboard, View } from 'react-native';
import { AuthProps } from '@/types/authTypes';
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function AuthLayout({ children }: AuthProps) {
  const { theme } = useAppStore();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      className={`w-full rounded-t-[40px] px-8 pt-10 pb-8 ${
        isKeyboardVisible ? 'min-h-[100%]' : 'min-h-[70%]'
      } ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
      {children}
    </View>
  );
}
