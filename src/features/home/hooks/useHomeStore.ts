import { useHomeStore } from '@/features/home/store/useHomeStore';

export const useSetHomeData = () => {
  return useHomeStore((state) => state.setData);
};
