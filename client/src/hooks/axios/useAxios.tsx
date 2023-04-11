import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../reactQuery/queryKeys';
import { User } from '../../types/types';

type Response<T> = Promise<T>;

type UseAxios = AxiosInstance & {
  get: <T>(url: string, config?: AxiosRequestConfig) => Response<T>;
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Response<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Response<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Response<T>;
};

const useAxios = (): UseAxios => {
  const api = axios.create();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response.status === 401 &&
        (error.response.data.errorCode === 'SESSION_EXPIRED' ||
          error.response.data.errorCode === 'INVALID_TOKEN')
      ) {
        try {
          const originalRequest = error.config;
          const response = await api.get('/api/users/refreshToken');
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          queryClient.setQueryData<User>([queryKeys.user], (oldData) => {
            if (!oldData) {
              return oldData;
            }
            return {
              ...oldData,
              token: response.data.accessToken,
            };
          });
          return api(originalRequest);
        } catch (error) {
          queryClient.setQueryData([queryKeys.user], null);
          navigate('/');
        }
      }
      return Promise.reject(error);
    }
  );

  return api as UseAxios;
};

export default useAxios;
