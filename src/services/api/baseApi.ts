import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://maire-unnatural-sparkle.ngrok-free.dev/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
});
