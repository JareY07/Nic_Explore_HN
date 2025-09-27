export const colors = {
  // Basado en tu paleta anterior pero con tipos
  primary: {
    50: '#e1eaf7',
    100: '#b3c9e8',
    400: '#4d8df0',
    500: '#2a5db0', // Base
    700: '#1a3d7a',
  },
  status: {
    success: '#40c057',
    error: '#fa5252',
    warning: '#ffd43b',
  },
  neutral: {
    white: '#ffffff',
    50: '#f8f9fa',
    100: '#e9ecef',
    400: '#6c757d',
    800: '#343a40',
  },
} as const;

export type Colors = typeof colors;
