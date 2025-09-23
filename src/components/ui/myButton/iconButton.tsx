import React from 'react';
import { Pressable } from 'react-native';

interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  accessibilityLabel,
  className = '',
}) => {
  const getSizeStyle = (): string => {
    switch (size) {
      case 'sm':
        return 'p-2';
      case 'md':
        return 'p-3';
      case 'lg':
        return 'p-4';
      default:
        return 'p-3';
    }
  };

  const getVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500';
      case 'secondary':
        return 'bg-neutral-100';
      case 'outline':
        return 'bg-transparent border border-neutral-300';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      className={`
        items-center justify-center rounded-full
        ${getVariantStyle()}
        ${getSizeStyle()}
        ${disabled ? 'opacity-60' : ''}
        ${className}
      `}>
      {icon}
    </Pressable>
  );
};

export default IconButton;
