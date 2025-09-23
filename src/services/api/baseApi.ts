import axios from 'axios';

export const api = axios.create({
  baseURL:
    'http://192.168.1.35:3000' /*<- tienes que poner (IPv4 Address) ya que se ejecuta desde un dispositivo externo*/,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
});
