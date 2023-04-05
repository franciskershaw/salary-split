import { useQuery } from '@tanstack/react-query';
import { useUser } from '../auth/useUser';
import { useAccountRequests } from '../requests/useAccountRequests';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Account } from '../../types/types';

export function useAccounts() {
  const { user } = useUser();
  const { getAccounts } = useAccountRequests();

  const { data: accounts = [] } = useQuery([queryKeys.accounts], () =>
    getAccounts(user?.accessToken || '')
  );
  const defaultAccountId = accounts.find(
    (account: Account) => account.defaultAccount
  )?._id;

  return { accounts, defaultAccountId };
}
