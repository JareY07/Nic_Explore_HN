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
        return 'bg-primary-800'; // Cambiado a verde oscuro (#04423D)
      case 'secondary':
        return 'bg-primary-500'; // Verde principal (#367356)
      case 'outline':
        return 'bg-transparent border-2 border-primary-800';
      case 'text':
        return 'bg-transparent';
      case 'text-gray':
        return 'bg-transparent';
      case 'glass':
        return 'bg-white/15 border border-white/25';
      default:
        return 'bg-primary-800';
    }
  };

  const getSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'py-2.5 px-5 rounded-xl';
      case 'md':
        return 'py-3.5 px-7 rounded-2xl';
      case 'lg':
        return 'py-4.5 px-9 rounded-3xl';
      default:
        return 'py-3.5 px-7 rounded-2xl';
    }
  };

  const getTextVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'text-white font-bold';
      case 'secondary':
        return 'text-white font-semibold';
      case 'outline':
        return 'text-primary-800 font-semibold';
      case 'text':
        return 'text-white font-medium';
      case 'text-gray':
        return 'text-neutral-400 font-medium';
      case 'glass':
        return 'text-white font-bold';
      default:
        return 'text-white font-bold';
    }
  };

  const getTextSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'text-base';
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
        shadow-black/40
        elevation-10
      `;
    }
    return '';
  };

  // Efectos de hover/press para cada variante
  const getPressEffectStyle = (): string => {
    if (disabled) return '';

    switch (variant) {
      case 'primary':
        return 'active:bg-primary-900 active:scale-95';
      case 'secondary':
        return 'active:bg-primary-600 active:scale-95';
      case 'outline':
        return 'active:bg-primary-50 active:scale-95';
      case 'text':
        return 'active:bg-white/10 active:scale-95';
      case 'text-gray':
        return 'active:bg-neutral-100 active:scale-95';
      case 'glass':
        return 'active:bg-white/20 active:scale-95';
      default:
        return 'active:scale-95';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      className={`
        flex-row items-center justify-center 
        transition-all duration-200
        ${getVariantStyle()} 
        ${getSizeStyle()}
        ${getGlassEffectStyle()}
        ${getPressEffectStyle()}
        ${disabled ? 'opacity-60' : 'opacity-100'}
        ${className}
      `}
      style={[
        baseStyle,
        variant === 'glass' && !disabled && !loading
          ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
            }
          : {},
      ]}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'glass' ||
            variant === 'text' ||
            variant === 'primary' ||
            variant === 'secondary'
              ? colors.neutral.white
              : variant === 'text-gray'
                ? colors.neutral[400]
                : colors.primary[700]
          }
          size="small"
        />
      ) : (
        <>
          {icon && <View className="mr-2.5">{icon}</View>}
          <Text
            className={`
              text-center
              ${getTextVariantStyle()}
              ${getTextSizeStyle()}
              ${textClassName}
            `}
            style={
              variant === 'glass'
                ? {
                    textShadowColor: 'rgba(0, 0, 0, 0.4)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 3,
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
