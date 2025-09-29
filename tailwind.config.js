/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/_layout.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
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
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '999px',
      },
      borderWidth: {
        thin: '0.5px',
        normal: '1px',
        thick: '2px',
      },
      spacing: {
        none: '0px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
      },
      fontSize: {
        xs: ['12px', '1.2'], // [fontSize, lineHeight]
        sm: ['14px', '1.2'],
        base: ['16px', '1.5'],
        lg: ['20px', '1.5'],
        xl: ['24px', '1.2'],
        '2xl': ['32px', '1.2'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        bold: '700',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        loose: '1.8',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
      transitionProperty: {
        all: 'all',
      },
      transitionDuration: {
        200: '200ms',
      },
      scale: {
        102: '1.02',
        105: '1.05',
      },
    },
    plugins: [],
    darkMode: 'class',
  },
};
