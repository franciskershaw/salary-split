import { useUser } from '../user/useUser';
import useAxios from '../axios/useAxios';
import { User } from '../../types/types';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

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

interface ErrorResponse {
  message: string;
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
      toast.success(`Logged in as ${response.data.userInfo.name}`);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError && axiosError.response) {
        toast.error(axiosError.response.data.message);
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
      toast.success(`Logged in as ${response.data.userInfo.name}`);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError && axiosError.response) {
        toast.error(axiosError.response.data.message);
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
