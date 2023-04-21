import { useQueryClient, useQuery } from '@tanstack/react-query';
import useAxios from '../axios/useAxios';
import { queryKeys } from '../../reactQuery/queryKeys';
import { useUserRequests } from '../requests/useUserRequests';
import { User } from '../../types/types';
import { useEffect, useContext } from 'react';
import Context from '../../context/Context';
import { toast } from 'react-toastify';

interface UseUserResponse {
  user: User | null;
  fetchingUser: boolean;
  updateUser: (newUser: User) => void;
  clearUser: () => Promise<void>;
}

export function useUser(): UseUserResponse {
  const { setDefaultId, setSalary } = useContext(Context);
  const api = useAxios();
  const queryClient = useQueryClient();
  const { getUser } = useUserRequests();

  const { data: user, isFetching: fetchingUser } = useQuery<User | null>(
    [queryKeys.user],
    () => getUser(user)
  );

  useEffect(() => {
    if (user && user.userInfo.defaultAccount) {
      setDefaultId(user.userInfo.defaultAccount);
    }

    if (user) {
      setSalary(user.userInfo.monthlySalary);
    }
  }, [user]);

  function updateUser(newUser: User) {
    queryClient.setQueryData<User | null>([queryKeys.user], newUser);
  }

  async function clearUser() {
    try {
      await api.post('/api/users/logout');
      queryClient.setQueryData<User | null>([queryKeys.user], null);
      queryClient.removeQueries([queryKeys.transactions]);
      queryClient.removeQueries([queryKeys.accounts]);
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Error clearing refreshToken cookie:');
    }
  }

  return { user: user ?? null, fetchingUser, updateUser, clearUser };
}
