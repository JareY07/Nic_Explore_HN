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
  black: {
    50: '#f4f4f5',
    100: '#e4e4e7',
    200: '#a1a1aa',
    300: '#71717a',
    400: '#52525b',
    500: '#27272a',
    600: '#18181b', // Base
    700: '#131316',
    800: '#0f0f12',
    900: '#09090b',
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
  blue: {
    50: '#e9f2fa',
    100: '#c7def2',
    200: '#99c3e6',
    300: '#6ba8da',
    400: '#3d8dce',
    500: '#2563eb', // Base
    600: '#1e4db5',
    700: '#163986',
    800: '#0e2557',
    900: '#051328',
  },
  // Amarillo sobrio (para empresa formal)
  yellow: {
    50: '#fffbea',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Base
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  // Morado corporativo
  purple: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Base
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  // Rojo elegante
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Base
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Base
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
} as const;

export type Colors = typeof colors;
