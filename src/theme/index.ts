import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { borders } from './borders';
import { BrandColorName } from '@/types/themeTypes';

export const theme = {
  colors,
  spacing,
  typography,
  borders,
};

export type Theme = typeof theme;

export type AppTheme = Theme & {
  mode: 'light' | 'dark';
  brand: {
    name: BrandColorName;
    shades: (typeof colors)[BrandColorName];
    primary: string;
    contrastText: string;
  };
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function isDark(hex: string) {
  return luminance(hex) < 0.5;
}
export default function buildTheme(
  brandName: BrandColorName,
  mode: AppTheme['mode'] = 'light',
): AppTheme {
  const shades = colors[brandName];
  const primary = shades?.[500] ?? Object.values(shades ?? {})[0] ?? '#000';
  const contrastText = isDark(primary) ? '#FFFFFF' : '#000000';

  const appTheme: AppTheme = {
    ...theme,
    mode,
    brand: {
      name: brandName,
      shades,
      primary,
      contrastText,
    },
  };
  return appTheme;
}

export { colors };
