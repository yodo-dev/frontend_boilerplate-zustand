import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const fetchUsersApi = async (params?: Record<string, any>) => {
  const queryString = params ? new URLSearchParams(params).toString() : '';
  const url = queryString ? `user/get?${queryString}` : 'user/get';
  return apiRequest(url);
};

export const useFetchUsersQuery = (params?: Record<string, any>, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsersApi(params),
    enabled,
  });
};

export const useLazyFetchUsersQuery = () => {
  // For lazy queries, we can use enabled: false and refetch manually
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsersApi(),
    enabled: false,
  });
  
  return {
    ...query,
    fetchUsers: (params?: Record<string, any>) => {
      return query.refetch();
    },
  };
};
