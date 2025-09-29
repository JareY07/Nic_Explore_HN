// hooks/useTheme.js
import { useAppStore } from '@/app/store/useAppStore'; // Ajusta la ruta

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useAppStore();

  return {
    isDarkMode: theme === 'dark',
    theme,
    toggleTheme,
    setTheme,
  };
};
