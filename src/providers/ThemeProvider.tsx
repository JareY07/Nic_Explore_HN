import { theme } from '@/theme';
import { createContext } from 'react';

export const ThemeContext = createContext(theme);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
