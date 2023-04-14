import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTransactionRequests } from '../requests/useTransactionRequests';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Transaction } from '../../types/types';
import { useMemo, useContext } from 'react';
import Context from '../../context/Context';
import { useUser } from '../auth/useUser';

export function useTransactions() {
  const queryClient = useQueryClient();
  const { getTransactions } = useTransactionRequests();
  const { user } = useUser();
  const { salary } = useContext(Context);

  const { data: transactions = [] } = useQuery(
    [queryKeys.transactions],
    getTransactions
  );

  const totalBills = useMemo(() => {
    return calculateTotal('bill');
  }, [transactions]);

  const totalSavings = useMemo(() => {
    return calculateTotal('savings');
  }, [transactions]);

  const balance = useMemo(() => {
    return Number(salary) - (totalBills + totalSavings);
  }, [transactions, salary]);

  function calculateTotal(transactionType: 'bill' | 'savings') {
    return transactions.reduce(
      (accumulator: number, transaction: Transaction) => {
        if (transaction.type === transactionType) {
          accumulator += transaction.amount;
        }
        return accumulator;
      },
      0
    );
  }

  const prefetchTransactions = async () => {
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.transactions],
      queryFn: getTransactions,
    });
  };

  return {
    transactions,
    totalBills,
    totalSavings,
    balance,
    prefetchTransactions,
  };
}
