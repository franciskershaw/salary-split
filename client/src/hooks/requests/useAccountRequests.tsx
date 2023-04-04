import useAxios from '../axios/useAxios';
import { AxiosResponse } from 'axios';
import { createConfig } from '../../utils/utils';
import { AddAccountState } from '../../types/types';

interface AccountRequests {
  addAccount: (token: string, formData: AddAccountState) => Promise<any>;
  getAccounts: (token: string) => Promise<any>;
}

export const useAccountRequests = (): AccountRequests => {
  const api = useAxios();

  const addAccount = async (
    token: string,
    formData: AddAccountState
  ): Promise<AxiosResponse> => {
    const config = createConfig(token);
    const response = await api.post(`/api/accounts`, formData, config);
    return response.data;
  };

  const getAccounts = async (token: string): Promise<AxiosResponse> => {
    const config = createConfig(token);
    const response = await api.get('/api/accounts', config);
    return response.data;
  };

  return { addAccount, getAccounts };
};
