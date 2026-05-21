import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

export type PaymentMethod = {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'unknown';
  last4: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
};

interface PaymentState {
  methods: PaymentMethod[];
  addMethod: (method: Omit<PaymentMethod, 'id' | 'isDefault'>) => void;
  removeMethod: (id: string) => void;
  setDefault: (id: string) => void;
}

const customSecureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      methods: [],
      addMethod: (methodProps) =>
        set((state) => {
          const newMethod: PaymentMethod = {
            ...methodProps,
            id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 9),
            isDefault: state.methods.length === 0, // set default if it's the first
          };
          return { methods: [...state.methods, newMethod] };
        }),
      removeMethod: (id) =>
        set((state) => {
          const newMethods = state.methods.filter((m) => m.id !== id);
          // if default was removed, make the first available one default
          if (state.methods.find((m) => m.id === id)?.isDefault && newMethods.length > 0) {
            newMethods[0].isDefault = true;
          }
          return { methods: newMethods };
        }),
      setDefault: (id) =>
        set((state) => ({
          methods: state.methods.map((m) => ({
            ...m,
            isDefault: m.id === id,
          })),
        })),
    }),
    {
      name: 'restaurant-payment-storage',
      storage: createJSONStorage(() => customSecureStorage),
    },
  ),
);
