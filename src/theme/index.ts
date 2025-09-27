import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { borders } from './borders';

export const theme = {
  colors,
  spacing,
  typography,
  borders,
};

export type Theme = typeof theme;
