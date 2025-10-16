import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { AuthProps } from '@/types/authTypes';
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';

export default function ImageLayout({ children }: AuthProps) {
  const { theme } = useAppStore();

  const backgroundColor = theme === 'dark' ? colors.neutral[900] : colors.neutral.white;
  const backgroundImage =
    theme === 'dark'
      ? require('@/assets/images/GranadaBackground.jpg')
      : require('@/assets/images/BeachBackground.jpg');

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
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={backgroundImage} className="flex-1" resizeMode="cover">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              paddingTop: isKeyboardVisible ? 40 : 0,
              paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* Logo */}
            <Image
              resizeMode="contain"
              className="w-full h-[80px] mb-4"
              source={require('@/assets/images/miniLogo.png')}
            />
            {children}
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
