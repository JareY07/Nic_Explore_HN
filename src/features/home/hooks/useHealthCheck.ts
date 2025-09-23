import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api/baseApi';

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/health');
        return data;
      } catch (error) {
        throw new Error('Error checking server health: ' + error);
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
