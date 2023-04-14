import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTransactionRequests } from '../requests/useTransactionRequests';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Transaction } from '../../types/types';
import { useMemo, useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { useAccounts } from '../accounts/useAccounts';
import { Account } from '../../types/types';

interface Summary {
  account: string;
  amount: number;
}

export function useTransactions() {
  const queryClient = useQueryClient();
  const { getTransactions } = useTransactionRequests();
  const { salary, defaultId } = useContext(Context);
  const { accounts } = useAccounts();

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

  const summary = useMemo(() => {
    return produceSummary(transactions);
  }, [transactions, salary, accounts, defaultId]);

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

  function getAccountNameById(id: string): string {
    const account = accounts.find((account: Account) => account._id === id);
    return account ? account.name : '';
  }

  function produceSummary(transactions: Transaction[]): Summary[] {
    const summaryMap = new Map<string, number>();

    for (const transaction of transactions) {
      const currentAmount = summaryMap.get(transaction.sendToAccount) || 0;
      summaryMap.set(
        transaction.sendToAccount,
        currentAmount + transaction.amount
      );
    }

    // Add the balance to the account with the _id equal to defaultId
    if (summaryMap.has(defaultId)) {
      const currentAmount = summaryMap.get(defaultId) || 0;
      summaryMap.set(defaultId, currentAmount + balance);
    } else {
      // If there's no account with the _id equal to defaultId, add a new row
      summaryMap.set(defaultId, balance);
    }

    const summary: Summary[] = [];

    for (const [account, amount] of summaryMap) {
      const accountName = getAccountNameById(account);
      summary.push({ account: accountName, amount });
    }

    return summary;
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
    summary,
    prefetchTransactions,
  };
}
