import useAxios from '../axios/useAxios';
import { AxiosResponse } from 'axios';
import { createConfig } from '../../utils/utils';
import { AddAccountState, EditAccountState } from '../../types/types';
import { useUser } from '../auth/useUser';

interface AccountRequests {
  addAccount: (formData: AddAccountState) => Promise<any>;
  getAccounts: () => Promise<any>;
  editAccount: (accountId: string, formData: EditAccountState) => Promise<any>;
}

export const useAccountRequests = (): AccountRequests => {
  const api = useAxios();
  const { user } = useUser()
  const config = createConfig(user?.accessToken || '');

  const addAccount = async (formData: AddAccountState): Promise<AxiosResponse> => {
    const response = await api.post(`/api/accounts`, formData, config);
    return response.data;
  };

  const getAccounts = async (): Promise<AxiosResponse> => {
    console.log(config)
    const response = await api.get('/api/accounts', config);
    console.log(response)
    return response.data;
  };

  const editAccount = async (accountId: string, formData: EditAccountState): Promise<AxiosResponse> => {
    const response = await api.put(`/api/accounts/${accountId}`, formData, config);
    return response.data;
  };

  return { addAccount, getAccounts, editAccount };
};
