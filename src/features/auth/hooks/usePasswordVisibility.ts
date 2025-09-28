import { useState, useCallback } from 'react';

const usePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState<'eye' | 'eye-off'>('eye-off'); // Cambiado a 'eye-off' por defecto

  const toggleVisibility = useCallback(() => {
    setPasswordVisibility((prev) => !prev);
    setRightIcon((prev) => (prev === 'eye' ? 'eye-off' : 'eye'));
  }, []);

  return {
    passwordVisibility,
    rightIcon,
    toggleVisibility,
  };
};

export default usePasswordVisibility;
