import { useQuery } from '@tanstack/react-query';
import { apiHealth } from '@/net/api';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: apiHealth.get,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000, // 5분마다 백그라운드 폴링
    retry: 1, // 실패 시 1번만 재시도
  });
};
