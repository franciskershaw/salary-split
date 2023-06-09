import useAxios from '../axios/useAxios';
import { createConfig } from '../../utils/utils';
import { User, EditUserState } from '../../types/types';

interface UserRequests {
  getUser: (user: User | null | undefined) => Promise<User | null>;
  editUser: (
    user: User | null | undefined,
    formData: EditUserState
  ) => Promise<User | null>;
}

export const useUserRequests = (): UserRequests => {
  const api = useAxios();

  const getUser = async (user: User | null | undefined) => {
    if (!user) {
      try {
        const response = await api.get(`/api/users/refreshToken`);
        if (response.status === 200) {
          const config = createConfig(response.data.accessToken);
          const user = await api.get(`/api/users/`, config);
          return user.data;
        }
      } catch (error) {
        return null;
      }
    } else {
      const config = createConfig(user.accessToken);
      const response = await api.get(`/api/users/`, config);
      return response.data;
    }
  };

  const editUser = async (
    user: User | null | undefined,
    formData: EditUserState
  ) => {
    const config = createConfig(user?.accessToken || '');
    const response = await api.put('/api/users/', formData, config);
    return response.data;
  };

  return { getUser, editUser };
};
