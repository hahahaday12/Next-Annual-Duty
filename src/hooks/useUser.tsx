import useSWR from 'swr';
import { userInfo } from '@/components/api/allApis';

export const useUser = () => {
  const { data, error, isValidating } = useSWR('/api/user/info', userInfo, {});

  return {
    user: data,
    isLoading: isValidating,
    isError: error,
  };
};
