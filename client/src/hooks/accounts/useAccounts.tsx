import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Account } from '../../types/types';
import { useMemo, useEffect, useContext } from 'react';
import Context from '../../context/Context';
import { useNavigate } from 'react-router-dom';

export function useAccounts() {
  const { setNoAccounts } = useContext(Context);

  const queryClient = useQueryClient();
  const { getAccounts } = useAccountRequests();

  const { data: accounts = [] } = useQuery([queryKeys.accounts], getAccounts);

  const defaultAccountId = accounts.find(
    (account: Account) => account.defaultAccount
  )?._id;

  const total = useMemo(() => {
    return accounts.reduce((accumulator: number, account: Account) => {
      if (!account.excludeFromTotal) {
        accumulator += account.amount;
      }
      return accumulator;
    }, 0);
  }, [accounts]);

  useEffect(() => {
    if (!accounts.length) {
      setNoAccounts(true);
    } else {
      setNoAccounts(false);
    }
  }, [accounts]);

  const prefetchAccounts = async () => {
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.accounts],
      queryFn: getAccounts,
    });
  };

  return { accounts, defaultAccountId, total, prefetchAccounts };
}
