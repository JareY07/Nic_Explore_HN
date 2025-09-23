import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserState } from '@/types/authTypes';
import { create } from 'zustand';

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      logIn: () =>
        set(() => {
          return { isLoggedIn: true };
        }),
      logOut: () =>
        set(() => {
          return { isLoggedIn: false };
        }),
      shouldCreateAccount: false,
      noAccountCreated: () =>
        set(() => {
          return { shouldCreateAccount: true };
        }),
      accountCreated: () =>
        set(() => {
          return { shouldCreateAccount: false };
        }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({ setItem, getItem, removeItem: deleteItemAsync })),
    },
  ),
);
