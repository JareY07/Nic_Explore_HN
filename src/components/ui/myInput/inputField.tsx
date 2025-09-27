import { TextInput, Pressable } from 'react-native';
import useInputAnimation from '@/components/hooks/useInputAnimation';
import usePasswordVisibility from '@/features/auth/hooks/usePasswordVisibility';
import { EyeOnIcon, EyeOffIcon } from '@/components/icons/icons';
import Animated from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import CodeInput from '@/features/auth/components/codeInput';
import { InputFieldProps } from '@/types/InputProps';

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onBlur,
  type,
  placeholder,
  trimSpaces,
  label,
  error,
}) => {
  const { passwordVisibility, rightIcon, toggleVisibility } = usePasswordVisibility();
  const { animatedStyle, handleFocus, handleBlur } = useInputAnimation();

  const handleBlurWithTrim = () => {
    onBlur();
    if (type !== 'code') {
      handleBlur();
    }
    if (trimSpaces && value && type !== 'code') {
      onChange(value.trim());
    }
  };

  const handleFocusWithAnimation = () => {
    // Solo llamar handleFocus para tipos que no sean 'code'
    if (type !== 'code') {
      handleFocus();
    }
  };

  if (type === 'code') {
    return (
      <CodeInput
        value={value}
        onChange={onChange}
        onBlur={handleBlurWithTrim}
        error={error}
        label={label}
      />
    );
  }
  return (
    <Animated.View
      style={[animatedStyle]}
      className="flex-row items-center mb-2 p-2 rounded-[15px] bg-neutral-white shadow-sm border border-neutral-100">
      <TextInput
        value={value ? String(value) : ''}
        onChangeText={onChange}
        onBlur={handleBlurWithTrim}
        onFocus={handleFocusWithAnimation}
        placeholder={placeholder}
        secureTextEntry={type === 'password' ? passwordVisibility : false}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        className="flex-1 text-black"
        accessibilityLabel={label}
        accessibilityHint={`Ingresa tu ${label?.toLowerCase()}`}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
      />

      {type === 'password' && (
        <Pressable
          onPress={toggleVisibility}
          accessibilityLabel="Alternar visibilidad de contraseña"
          className="p-2"
          accessibilityHint="Presiona para mostrar u ocultar la contraseña">
          {rightIcon === 'eye' ? (
            <EyeOnIcon color={colors.primary[400]} />
          ) : (
            <EyeOffIcon color={colors.primary[400]} />
          )}
        </Pressable>
      )}
    </Animated.View>
  );
};

export default InputField;
