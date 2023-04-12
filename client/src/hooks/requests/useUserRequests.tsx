import useAxios from '../axios/useAxios';
import { createConfig } from '../../utils/utils';
import { User } from '../../types/types';

interface UserRequests {
  getUser: (user: User | null | undefined) => Promise<User | null>;
}

export const useUserRequests = (): UserRequests => {
  const api = useAxios();

  const getUser = async (user: User | null | undefined) => {
    if (!user) {
      try {
        const response = await api.get(`/api/users/refreshToken`);
        if (response.status === 200) {
          const config = createConfig(response.data.accessToken);
          const user = await api.get(`/api/users/${response.data._id}`, config);
          return user.data;
        }
      } catch (error) {
        return null;
      }
    } else {
      const config = createConfig(user.accessToken);
      const response = await api.get(`/api/users/${user.userInfo._id}`, config);
      return response.data;
    }
  };

  return {
    getUser,
  };
};
