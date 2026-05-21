import { FontFamily } from '@/theme/fonts';
import { TextProps as RNTextProps } from 'react-native';

export type ThemeMode = 'light' | 'dark';
export const BRAND_PALETTES = ['blue', 'yellow', 'purple', 'red', 'green', 'black'] as const;
export type BrandColorName = (typeof BRAND_PALETTES)[number];

export interface AppState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  brandColor: BrandColorName;
  setBrandColor: (color: BrandColorName) => void;
  productQuantities: Record<string, number>;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
}
export interface MyTextProps extends RNTextProps {
  fontFamily?: FontFamily;
  children: React.ReactNode;
}
