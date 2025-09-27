import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const useInputAnimation = () => {
  const borderWidth = useSharedValue(1);
  const borderColor = useSharedValue(
    typeof colors.neutral[100] === 'string' ? colors.neutral[100] : colors.primary[400],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
    borderColor: borderColor.value,
  }));

  const handleFocus = () => {
    borderWidth.value = withTiming(2, { duration: 200 });
    borderColor.value = withTiming(colors.primary[400], { duration: 200 });
  };

  const handleBlur = () => {
    borderWidth.value = withTiming(1, { duration: 200 });
    borderColor.value = withTiming(colors.neutral[100], { duration: 200 });
  };

  return { animatedStyle, handleFocus, handleBlur };
};

export default useInputAnimation;
