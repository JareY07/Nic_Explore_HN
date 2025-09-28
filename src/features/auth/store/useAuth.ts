import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserState } from '@/types/authTypes';
import { create } from 'zustand';

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      authFlow: null,
      tempEmail: null,
      logIn: () => set({ isLoggedIn: true, authFlow: null }),
      logOut: () => set({ isLoggedIn: false, authFlow: null, tempEmail: null }),
      setAuthFlow: (flow) => set({ authFlow: flow }),
      setTempEmail: (email) => set({ tempEmail: email }),
      clearTempEmail: () => set({ tempEmail: null }),
      resetAuthFlow: () => set({ authFlow: null, tempEmail: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({ setItem, getItem, removeItem: deleteItemAsync })),
    },
  ),
);
