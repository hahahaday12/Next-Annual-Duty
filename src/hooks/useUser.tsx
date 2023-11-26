import useSWR from 'swr';
import { userInfo } from '@/components/api/userInfo';

export const useUser = () => {
  const { data, error, isValidating } = useSWR('/api/user/info', userInfo, {});

  return {
    user: data,
    isLoading: isValidating,
    isError: error,
  };
};
