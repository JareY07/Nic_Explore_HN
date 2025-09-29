// services/authService.ts
import { api } from '@/services/api/baseApi';
import { AuthResponse, LoginData, SignUpData } from '@/types/authTypes';

export const authService = {
  // Login
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth', credentials);
    return response.data;
  },

  // Signup (ya lo tienes)
  signUp: async (userData: SignUpData): Promise<AuthResponse> => {
    const response = await api.post('/create', userData);
    return response.data;
  },
};
