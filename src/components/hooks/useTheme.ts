// components/hooks/useTheme.ts
import { useCallback, useContext, useMemo } from 'react';
import { ThemeContext } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export const useThemeData = () => {
  const appTheme = useContext(ThemeContext);
  const brandShades = useMemo(() => appTheme.brand?.shades ?? {}, [appTheme.brand?.shades]);
  const { theme: mode, brandColor } = useAppStore(
    useShallow((state) => ({
      theme: state.theme,
      brandColor: state.brandColor,
    })),
  );

  const getBrandShade = useCallback(
    (shade: keyof typeof brandShades) => brandShades[shade],
    [brandShades],
  );

  return useMemo(
    () => ({
      isDarkMode: mode === 'dark',
      mode,
      theme: appTheme,
      brandColor,
      getBrandShade,
    }),
    [appTheme, brandColor, getBrandShade, mode],
  );
};

export const useThemeActions = () => {
  return useAppStore(
    useShallow((state) => ({
      toggleTheme: state.toggleTheme,
      setTheme: state.setTheme,
      setBrandColor: state.setBrandColor,
    })),
  );
};

export const useTheme = () => {
  const data = useThemeData();
  const actions = useThemeActions();

  return useMemo(
    () => ({
      ...data,
      ...actions,
    }),
    [actions, data],
  );
};
