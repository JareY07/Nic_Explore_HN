export const borders = {
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 999,
  },
  width: {
    thin: 0.5,
    normal: 1,
    thick: 2,
  },
} as const;

export type Borders = typeof borders;
