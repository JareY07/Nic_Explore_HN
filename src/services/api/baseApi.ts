import { useAuthStore } from '@/features/auth/store/useAuth';
import { create } from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const api = create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
});
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logOut();
    }
    return Promise.reject(error);
  },
);
