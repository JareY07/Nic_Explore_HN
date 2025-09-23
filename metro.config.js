const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@/app': path.resolve(__dirname, 'src/app'),
    '@/components': path.resolve(__dirname, 'src/components'),
    '@/store': path.resolve(__dirname, 'src/store'),
    '@/services': path.resolve(__dirname, 'src/services'),
    '@/hooks': path.resolve(__dirname, 'src/hooks'),
    '@/types': path.resolve(__dirname, 'src/types'),
    '@/utils': path.resolve(__dirname, 'src/utils'),
    '@/assets': path.resolve(__dirname, 'src/assets'),
    '@/constants': path.resolve(__dirname, 'src/constants'),
  },
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
  },
};

module.exports = withNativeWind(config, { input: './global.css' });
