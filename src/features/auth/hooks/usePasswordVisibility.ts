import { useState } from 'react';

const usePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState<'eye' | 'eye-off'>('eye');

  const toggleVisibility = () => {
    setPasswordVisibility((prev) => !prev);
    setRightIcon((prev) => (prev === 'eye' ? 'eye-off' : 'eye'));
  };

  return { passwordVisibility, rightIcon, toggleVisibility };
};

export default usePasswordVisibility;
