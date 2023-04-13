import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTransactionRequests } from '../requests/useTransactionRequests';
import { AddTransactionState, User, Transaction } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';

export function useAddTransaction() {
  const { addTransaction } = useTransactionRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: AddTransactionState) => addTransaction(formData),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.setQueryData(
          [queryKeys.user],
          (oldUserData: User | undefined) => {
            if (!oldUserData) {
              return undefined;
            }
            const newUserData = { ...oldUserData };
            newUserData.userInfo.transactions.push(data.transaction._id);
            return newUserData;
          }
        );

        const { transaction } = data;
        queryClient.setQueryData<Transaction[]>(
          [queryKeys.transactions],
          (oldTransactions: Transaction[] | undefined) => {
            if (!oldTransactions) return oldTransactions;
            return [...oldTransactions, transaction];
          }
        );
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return mutate;
}
