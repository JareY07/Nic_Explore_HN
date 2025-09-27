import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeState } from '@/types/homeState';

export const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      data: 'ok',
      setData: (data) => set({ data }),
    }),
    {
      name: 'home-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
