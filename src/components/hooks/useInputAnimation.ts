// hooks/useInputAnimation.ts
import { useState } from 'react';

const useInputAnimation = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Retornar clases condicionales - ACTUALIZADO CON VERDE CLARO
  const getBorderClass = (error?: any) => {
    if (error) return 'border-status-error';
    if (isFocused) return 'border-primary-300 border-2 shadow-lg'; // Verde claro + sombra
    return 'border-neutral-200 border-2 shadow-sm';
  };

  const getScaleClass = () => {
    return isFocused ? '' : ''; // Puedes dejar esto vacío o usar transform nativo si es compatible
  };

  return {
    getBorderClass,
    getScaleClass,
    handleFocus,
    handleBlur,
    isFocused,
  };
};

export default useInputAnimation;
