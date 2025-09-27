export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
  },
  weights: {
    light: '300',
    regular: '400',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
} as const;

export type Typography = typeof typography;
