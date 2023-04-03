import { useQueryClient, useQuery } from '@tanstack/react-query';
import useAxios from '../axios/useAxios';
import { queryKeys } from '../../reactQuery/queryKeys';
import { useUserRequests } from '../requests/useUserRequests';
import { User } from '../../types/types';

interface UseUserResponse {
  user: User | null;
  fetchingUser: boolean;
  updateUser: (newUser: User) => void;
  clearUser: () => Promise<void>;
}

export function useUser(): UseUserResponse {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { getUser } = useUserRequests();

  const { data: user, isFetching: fetchingUser } = useQuery<User | null>(
    [queryKeys.user],
    () => getUser(null)
  );

  function updateUser(newUser: User) {
    queryClient.setQueryData<User | null>([queryKeys.user], newUser);
  }

  async function clearUser() {
    try {
      await api.post('/api/users/logout');
      queryClient.setQueryData<User | null>([queryKeys.user], null);
      queryClient.removeQueries([queryKeys.transactions]);
      queryClient.removeQueries([queryKeys.accounts]);
    } catch (error) {
      console.error('Error clearing refreshToken cookie:', error);
    }
  }

  return { user: user ?? null, fetchingUser, updateUser, clearUser };
}
