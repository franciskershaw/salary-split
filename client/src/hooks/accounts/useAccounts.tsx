import { useQuery } from '@tanstack/react-query';
import { useUser } from '../auth/useUser';
import { useAccountRequests } from '../requests/useAccountRequests';
import { queryKeys } from '../../reactQuery/queryKeys';

export function useAccounts() {
  const { user } = useUser();
  const { getAccounts } = useAccountRequests();

  const { data: accounts = [] } = useQuery([queryKeys.accounts], () =>
    getAccounts(user?.accessToken || '')
  );

  return accounts;
}
