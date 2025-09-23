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
        return 'text-primary-500';
      default:
        return 'text-neutral-100';
    }
  };

  const getTextSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      className={`
        flex-row items-center justify-center rounded-[20px] 
        ${getVariantStyle()} 
        ${getSizeStyle()}
        ${disabled ? 'opacity-60' : 'opacity-100'}
        ${className}
      `}
      style={baseStyle}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'secondary'
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
              ${textClassName}
            `}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default MyButton;
