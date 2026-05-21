import React from 'react';
import { Animated, Pressable, Text, ActivityIndicator, View } from 'react-native';
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
  const pressAnimation = React.useRef(new Animated.Value(0)).current;

  const getVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-700';
      case 'secondary':
        return 'bg-primary-500'; // Verde principal (#367356)
      case 'outline':
        return 'bg-white/80 border border-primary-200';
      case 'text':
        return 'bg-transparent';
      case 'text-gray':
        return 'bg-transparent';
      case 'glass':
        return 'bg-white/18 border border-white/30';
      default:
        return 'bg-primary-700';
    }
  };

  const getSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'py-2.5 px-5 rounded-2xl';
      case 'md':
        return 'py-3.5 px-7 rounded-3xl';
      case 'lg':
        return 'py-4 px-9 rounded-full';
      default:
        return 'py-3.5 px-7 rounded-3xl';
    }
  };

  const getTextVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'text-white font-semibold';
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
        shadow-lg
        shadow-black/10
        elevation-3
      `;
    }
    return '';
  };

  const handlePressIn = () => {
    Animated.spring(pressAnimation, {
      toValue: 1,
      useNativeDriver: true,
      speed: 22,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnimation, {
      toValue: 0,
      useNativeDriver: true,
      speed: 22,
      bounciness: 0,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: pressAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.98],
        }),
      },
      {
        translateY: pressAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityLabel={accessibilityLabel || title}
        style={({ pressed }) => ({
          opacity: disabled ? 0.55 : pressed ? 0.92 : 1,
        })}
        className={`
        flex-row items-center justify-center 
        ${getVariantStyle()} 
        ${getSizeStyle()}
        ${getGlassEffectStyle()}
        ${variant === 'outline' ? 'shadow-sm shadow-primary-100' : ''}
        ${className}
      `}>
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
              ${variant === 'glass' ? 'text-shadow-sm shadow-black/40' : ''}
            `}>
              {title}
            </Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default MyButton;
