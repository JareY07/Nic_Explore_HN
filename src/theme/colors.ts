export const colors = {
  // Basado en tu paleta anterior pero con tipos
  primary: {
    50: '#f0f9f8', // Muy claro, basado en #04423D
    100: '#d1eeea', // Claro
    200: '#a3ddd5',
    300: '#75cbc0',
    400: '#47baab', // Intermedio
    500: '#367356', // Tu color principal
    600: '#2a5d45', // Más oscuro
    700: '#1e4734', // Oscuro
    800: '#04423D', // Tu color oscuro
    900: '#03332a', // Muy oscuro
  },
  status: {
    success: '#40c057',
    error: '#fa5252',
    warning: '#ffd43b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    white: '#ffffff',
    black: '#000000',
  },
} as const;

export type Colors = typeof colors;
