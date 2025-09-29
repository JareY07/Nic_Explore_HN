import { Pressable, View } from 'react-native';
import { colors } from '@/theme/colors';
import { memo } from 'react';

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = memo(({ isEnabled, onToggle, size = 'md' }) => {
  const sizes = {
    sm: {
      width: 40,
      height: 20,
      circle: 16,
    },
    md: {
      width: 52,
      height: 26,
      circle: 20,
    },
    lg: {
      width: 60,
      height: 30,
      circle: 24,
    },
  };

  const { width, height, circle } = sizes[size];

  return (
    <Pressable
      onPress={() => onToggle(!isEnabled)}
      accessibilityLabel={isEnabled ? 'Desactivar' : 'Activar'}
      accessibilityRole="switch"
      accessibilityState={{ checked: isEnabled }}>
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: isEnabled ? colors.primary[500] : colors.neutral[400],
          justifyContent: 'center',
          padding: 2,
        }}>
        <View
          style={{
            width: circle,
            height: circle,
            borderRadius: circle / 2,
            backgroundColor: colors.neutral.white,
            transform: [{ translateX: isEnabled ? width - circle - 4 : 2 }],
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.5,
            elevation: 2,
          }}
        />
      </View>
    </Pressable>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
