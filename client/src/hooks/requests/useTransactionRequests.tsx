import useAxios from '../axios/useAxios';
import { AxiosResponse } from 'axios';
import { createConfig } from '../../utils/utils';
import { AddTransactionState } from '../../types/types';
import { useUser } from '../auth/useUser';

interface TransactionRequests {
	addTransaction: (formData: AddTransactionState) => Promise<any>
}

export const useTransactionRequests = (): TransactionRequests => {
  const api = useAxios();
  const { user } = useUser()
  const config = createConfig(user?.accessToken || '');

  const addTransaction = async (formData: AddTransactionState): Promise<AxiosResponse> => {
    const response = await api.post(`/api/transactions`, formData, config);
    return response.data;
  };

	return { addTransaction }
};
