// store/useAuth.ts
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserState, type SignUpData } from '@/types/authTypes';
import { create } from 'zustand';

const initialSignUpData: SignUpData = {
  firstName: '',
  lastName: '',
  username: '',
  userMail: '',
  userPassword: '',
};

export const useAuthStore = create(
  persist<UserState>(
    (set, get) => ({
      isLoggedIn: false,
      authFlow: null,
      tempEmail: null,
      signUpData: initialSignUpData,

      logIn: () => set({ isLoggedIn: true, authFlow: null }),
      logOut: () =>
        set({
          isLoggedIn: false,
          authFlow: null,
          tempEmail: null,
          signUpData: initialSignUpData,
        }),

      setAuthFlow: (flow) => set({ authFlow: flow }),
      setTempEmail: (email) => set({ tempEmail: email }),
      clearTempEmail: () => set({ tempEmail: null }),
      resetAuthFlow: () => set({ authFlow: null, tempEmail: null }),

      setSignUpData: (data: Partial<SignUpData>) =>
        set((state) => {
          const updatedData = { ...state.signUpData, ...data };
          return { signUpData: updatedData };
        }),
      clearSignUpData: () => set({ signUpData: initialSignUpData }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({ setItem, getItem, removeItem: deleteItemAsync })),
    },
  ),
);
