import { useHomeStore } from '../store/useHomeStore';

export const useHomeData = () => {
  return useHomeStore((state) => state.data);
};
