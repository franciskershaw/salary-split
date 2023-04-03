import { useUser } from './useUser';
import useAxios from '../axios/useAxios';
import { User } from '../../types/types';

interface UseAuthResponse {
  signin: (userData: {
    username: string;
    password: string;
  }) => Promise<User | null>;
  signup: (userData: {
    username: string;
    name: string;
    monthlySalary: number;
    password: string;
  }) => Promise<User | null>;
  signout: () => void;
}

export function useAuth(): UseAuthResponse {
  const { clearUser, updateUser } = useUser();
  const api = useAxios();

  async function signin(userData: {
    username: string;
    password: string;
  }): Promise<User | null> {
    try {
      const response = await api.post<User>('/api/users/login', userData);
      updateUser(response.data);
      return response.data;
    } catch (error) {
      if (error) {
        console.log(error);
      }
      return null;
    }
  }

  async function signup(userData: {
    username: string;
    name: string;
    monthlySalary: number;
    password: string;
  }): Promise<User | null> {
    try {
      const response = await api.post<User>('/api/users/', userData);
      updateUser(response.data);
      return response.data;
    } catch (error) {
      if (error) {
        console.log(error);
      }
      return null;
    }
  }

  function signout() {
    clearUser();
  }

  return {
    signin,
    signup,
    signout,
  };
}
