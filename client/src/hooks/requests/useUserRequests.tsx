import useAxios from '../axios/useAxios';
import { createConfig } from '../../utils/utils';
import { User } from '../../types/types';

interface UserRequests {
  getUser: (user: User | null) => Promise<User | null>;
}

export const useUserRequests = (): UserRequests => {
  const api = useAxios();

  const getUser = async (user: User | null): Promise<User | null> => {
    if (!user) {
      try {
        const response = await api.get<{ _id: string; token: string }>('/api/users/refreshToken');
        if (response.status === 200) {
          const config = createConfig(response.data.token);
          const user = await api.get<User>(`/api/users/${response.data._id}`, config);
          return user.data;
        }
      } catch (error) {
        return null;
      }
    } else {
      const config = createConfig(user.accessToken);
      const response = await api.get<User>(`/api/users/${user.userInfo._id}`, config);
      return response.data;
    }
    return null;
  };

  return {
    getUser,
  };
};
