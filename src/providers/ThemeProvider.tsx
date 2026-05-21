// Provider/themeProvider.tsx
import React, { createContext, useMemo } from 'react';
import buildTheme, { AppTheme } from '@/theme';
import { useAppStore } from '@/store/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export const ThemeContext = createContext<AppTheme>(buildTheme('blue', 'light'));

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: mode, brandColor } = useAppStore(
    useShallow((state) => ({
      theme: state.theme,
      brandColor: state.brandColor,
    })),
  );

  const appTheme = useMemo(() => buildTheme(brandColor, mode), [brandColor, mode]);

  return <ThemeContext.Provider value={appTheme}>{children}</ThemeContext.Provider>;
}
