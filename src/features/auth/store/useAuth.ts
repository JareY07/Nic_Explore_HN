// store/useAuth.ts
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserState, type SignUpData, type AuthResponse } from '@/types/authTypes';
import { create } from 'zustand';

const initialSignUpData: SignUpData = {
  firstName: '',
  lastName: '',
  username: '',
  userMail: '',
  userPassword: '',
};

const mergeSignUpData = (current: SignUpData, update: Partial<SignUpData>): SignUpData => ({
  firstName: update.firstName ?? current.firstName,
  lastName: update.lastName ?? current.lastName,
  username: update.username ?? current.username,
  userMail: update.userMail ?? current.userMail,
  userPassword: update.userPassword ?? current.userPassword,
});

export const useAuthStore = create(
  persist<UserState>(
    (set, get) => ({
      isLoggedIn: false,
      authFlow: null,
      tempEmail: null,
      signUpData: initialSignUpData,
      token: null,
      user: null,

      // ✅ ACTUALIZADO: Ahora recibe los datos del login
      logIn: (authData: AuthResponse) =>
        set({
          isLoggedIn: true,
          authFlow: null,
          token: authData.token,
          user: authData.user,
        }),

      logOut: () =>
        set({
          isLoggedIn: false,
          authFlow: null,
          tempEmail: null,
          signUpData: initialSignUpData,
          token: null,
          user: null,
        }),

      setAuthFlow: (flow) => set({ authFlow: flow }),
      setTempEmail: (email) => set({ tempEmail: email }),
      clearTempEmail: () => set({ tempEmail: null }),
      resetAuthFlow: () => set({ authFlow: null, tempEmail: null }),

      setSignUpData: (data: Partial<SignUpData>) =>
        set((state) => ({
          signUpData: mergeSignUpData(state.signUpData, data),
        })),

      clearSignUpData: () => set({ signUpData: initialSignUpData }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({ setItem, getItem, removeItem: deleteItemAsync })),
    },
  ),
);
