// components/ui/myInput/MyCheckBox.tsx
import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { useAppStore } from '@/store/useAppStore'; // Importar el store del tema

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
  const { theme } = useAppStore(); // Obtener el tema actual

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
      return theme === 'dark'
        ? 'bg-neutral-700 border-neutral-600'
        : 'bg-neutral-100 border-neutral-300';
    }

    if (checked) {
      return variant === 'primary'
        ? 'bg-primary-800 border-primary-800'
        : 'bg-primary-500 border-primary-500';
    }

    return theme === 'dark' ? 'bg-neutral-800 border-neutral-600' : 'bg-white border-neutral-300';
  };

  const getLabelColor = () => {
    if (disabled) {
      return theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400';
    }
    return theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700';
  };

  const getActiveStyle = () => {
    return theme === 'dark' ? 'active:bg-neutral-700' : 'active:bg-neutral-50';
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
          ${!disabled && getActiveStyle()}
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
            ${getLabelColor()}
            ${labelClassName}
          `}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default Checkbox;
