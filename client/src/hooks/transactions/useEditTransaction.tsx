import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTransactionRequests } from '../requests/useTransactionRequests';
import { EditTransactionState } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Transaction } from '../../types/types';

export function useEditTransaction(transactionId: string) {
  const { editTransaction } = useTransactionRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: EditTransactionState) => editTransaction(transactionId, formData),
    {
      onSuccess: (data) => {
        const updatedTransaction = data;
        queryClient.setQueryData<Transaction[]>(
          [queryKeys.transactions],
          (oldTransactions: Transaction[] | undefined) => {
            if (!oldTransactions) return oldTransactions;
            return oldTransactions.map((transaction: Transaction) =>
              transaction._id === transactionId ? updatedTransaction : transaction
            );
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
