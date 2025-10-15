import { useAppStore } from '@/store/useAppStore';

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useAppStore();

  return {
    isDarkMode: theme === 'dark',
    theme,
    toggleTheme,
    setTheme,
  };
};
