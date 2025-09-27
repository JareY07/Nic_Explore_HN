import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, View } from 'react-native';
import { colors } from '@/theme/colors';
import { ButtonProps } from '@/types/buttonProps';

const MyButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  accessibilityLabel,
  className = '',
  textClassName = '',
  icon,
}) => {
  // Estilos base
  const baseStyle: ViewStyle = {
    opacity: disabled ? 0.6 : 1,
  };

  const getVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500';
      case 'secondary':
        return 'bg-status-success';
      case 'outline':
        return 'bg-transparent border border-primary-500';
      case 'text':
        return 'bg-transparent';
      case 'glass': // Nueva variante glass
        return 'bg-white/10 border border-white/20';
      default:
        return 'bg-primary-500';
    }
  };

  const getSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4';
      case 'md':
        return 'py-3 px-6';
      case 'lg':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  const getTextVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'text-neutral-100';
      case 'secondary':
        return 'text-neutral-white';
      case 'outline':
        return 'text-primary-500';
      case 'text':
        return 'text-white';
      case 'glass':
        return 'text-white font-extrabold';
      default:
        return 'text-neutral-100';
    }
  };

  const getTextSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'text-md';
      case 'md':
        return 'text-lg';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getGlassEffectStyle = (): string => {
    if (variant === 'glass') {
      return `
        backdrop-blur-2xl
        shadow-2xl
        shadow-black/30
        elevation-8
      `;
    }
    return '';
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      className={`
        flex-row items-center justify-center rounded-2xl
        ${getVariantStyle()} 
        ${getSizeStyle()}
        ${getGlassEffectStyle()}
        ${disabled ? 'opacity-60' : 'opacity-100'}
        ${className}
      `}
      style={[
        baseStyle,
        variant === 'glass' && !disabled && !loading
          ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
            }
          : {},
      ]}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'glass'
              ? colors.neutral.white
              : variant === 'primary' || variant === 'secondary'
                ? colors.neutral.white
                : colors.primary[500]
          }
          size="small"
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text
            className={`
              font-semibold text-center
              ${getTextVariantStyle()}
              ${getTextSizeStyle()}
              ${variant === 'glass' ? 'font-medium' : 'font-semibold'}
              ${textClassName}
            `}
            style={
              variant === 'glass'
                ? {
                    textShadowColor: 'rgba(0, 0, 0, 0.3)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }
                : {}
            }>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default MyButton;
