/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/_layout.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e1eaf7',
          100: '#b3c9e8',
          400: '#4d8df0',
          500: '#2a5db0',
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
    },
    plugins: [],
  },
};
