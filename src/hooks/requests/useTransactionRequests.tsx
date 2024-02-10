import useAxios from '../axios/useAxios';
import { AxiosResponse } from 'axios';
import { createConfig } from '../../utils/utils';
import { AddTransactionState, EditTransactionState } from '../../types/types';
import { useUser } from '../user/useUser';

interface TransactionRequests {
	addTransaction: (formData: AddTransactionState) => Promise<any>;
	getTransactions: () => Promise<any>;
	editTransaction: (transactionId: string, formData: EditTransactionState) => Promise<any>;
	deleteTransaction: (transactionId: string) => Promise<any>;
}

export const useTransactionRequests = (): TransactionRequests => {
  const api = useAxios();
  const { user } = useUser()
  const config = createConfig(user?.accessToken || '');

  const addTransaction = async (formData: AddTransactionState): Promise<AxiosResponse> => {
    const response = await api.post(`/api/transactions`, formData, config);
    return response.data;
  };

	const getTransactions = async (): Promise<AxiosResponse> => {
		const response = await api.get('/api/transactions', config)
		return response.data
	}

	const editTransaction = async (transactionId: string, formData: EditTransactionState): Promise<AxiosResponse> => {
		const response = await api.put(`/api/transactions/${transactionId}`, formData, config)
		return response.data
	}

	const deleteTransaction = async (transactionId: string): Promise<AxiosResponse> => {
		const response = await api.delete(`/api/transactions/${transactionId}`, config)
		return response.data
	}

	return { addTransaction, getTransactions, editTransaction, deleteTransaction }
};
