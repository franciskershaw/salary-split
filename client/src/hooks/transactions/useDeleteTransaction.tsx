import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTransactionRequests } from '../requests/useTransactionRequests';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Transaction, User } from '../../types/types';

export function useDeleteTransaction(transactionId: string) {
  const { deleteTransaction } = useTransactionRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteTransaction(transactionId), {
    onSuccess: (data) => {
      const { deleted } = data;

      queryClient.setQueryData(
        [queryKeys.user],
        (oldUserData: User | undefined) => {
          if (!oldUserData) return oldUserData;
          const newUserData = { ...oldUserData };
          newUserData.userInfo.transactions =
            newUserData.userInfo.transactions.filter(
              (transactionId) => transactionId !== deleted
            );
          return newUserData;
        }
      );

      queryClient.setQueryData<Transaction[]>(
        [queryKeys.transactions],
        (oldTransactions) => {
          if (!oldTransactions) return oldTransactions;
          return oldTransactions.filter(
            (transaction) => transaction._id !== deleted
          );
        }
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutate;
}
