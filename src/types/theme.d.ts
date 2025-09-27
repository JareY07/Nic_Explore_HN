// theme.d.ts
import { Theme } from '@/theme';

declare module 'react' {
  type DefaultTheme = Theme; // Extiende el tipo tema
}
