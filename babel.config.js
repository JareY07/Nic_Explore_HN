module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]],
    plugins: [
      'react-native-worklets/plugin',
      'expo-router/babel',

      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@/app': './src/app',
            '@/components': './src/components',
            '@/store': './src/store',
            '@/services': './src/services',
            '@/hooks': './src/hooks',
            '@/types': './src/types',
            '@/assets': './src/assets',
            '@/constants': './src/constants',
            '@/utils': './src/utils',
          },
        },
      ],
    ],
  };
};
