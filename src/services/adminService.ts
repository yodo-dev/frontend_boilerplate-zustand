import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const getDashboardStatsApi = async () => {
  return apiRequest('packing-list/summary');
};

export const useGetDashboardStatsQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStatsApi,
    enabled,
  });
};

export const useLazyGetDashboardStatsQuery = () => {
  const query = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStatsApi,
    enabled: false,
  });
  
  return {
    ...query,
    fetchStats: () => query.refetch(),
  };
};
