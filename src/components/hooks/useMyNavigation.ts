import React from 'react';
import { useNavigation, useRouter } from 'expo-router';

const HIDDEN_HEADER_OPTIONS = { headerShown: false } as const;

interface UseProductNavigationResult {
  handleGoBack: () => void;
}

export function useMyNavigation(): UseProductNavigationResult {
  const navigation = useNavigation<any>();
  const router = useRouter();

  React.useLayoutEffect(() => {
    navigation?.setOptions?.(HIDDEN_HEADER_OPTIONS);
  }, [navigation]);

  const handleGoBack = React.useCallback(() => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    router.replace('/(drawer)/(tabs)');
  }, [navigation, router]);

  return { handleGoBack };
}

export function useNoHeader() {
  const navigation = useNavigation<any>();

  React.useLayoutEffect(() => {
    navigation?.setOptions?.(HIDDEN_HEADER_OPTIONS);
  }, [navigation]);
}
