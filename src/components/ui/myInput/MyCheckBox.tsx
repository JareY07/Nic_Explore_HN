import React from 'react';
import { Pressable, View, Text } from 'react-native';

export interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
  labelClassName?: string;
  accessibilityLabel?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
  labelClassName = '',
  accessibilityLabel,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-5 h-5';
      case 'lg':
        return 'w-7 h-7';
      case 'md':
      default:
        return 'w-6 h-6';
    }
  };

  const getVariantStyles = () => {
    if (disabled) {
      return 'bg-neutral-100 border-neutral-300';
    }

    if (checked) {
      return variant === 'primary'
        ? 'bg-primary-800 border-primary-800'
        : 'bg-primary-500 border-primary-500';
    }

    return 'bg-white border-neutral-300';
  };

  return (
    <Pressable
      onPress={() => !disabled && onToggle(!checked)}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || label || 'Checkbox'}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      className={`flex-row items-center ${disabled ? 'opacity-60' : 'opacity-100'} ${className}`}>
      {/* Checkbox Box */}
      <View
        className={`
          ${getSizeStyles()} 
          ${getVariantStyles()}
          border-2 rounded-md
          justify-center items-center
          ${!disabled && 'active:opacity-80'}
        `}>
        {/* Checkmark usando texto ✓ */}
        {checked && (
          <Text
            className="text-white font-bold"
            style={{
              fontSize: size === 'sm' ? 10 : size === 'lg' ? 14 : 12,
              lineHeight: size === 'sm' ? 10 : size === 'lg' ? 14 : 12,
            }}>
            ✓
          </Text>
        )}
      </View>

      {/* Label */}
      {label && (
        <Text
          className={`
            ml-3 flex-1
            ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
            ${disabled ? 'text-neutral-400' : 'text-neutral-700'}
            ${labelClassName}
          `}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default Checkbox;
