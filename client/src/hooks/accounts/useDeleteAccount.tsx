import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Account, User } from '../../types/types';

export function useDeleteAccount(accountId: string) {
  const { deleteAccount } = useAccountRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteAccount(accountId), {
    onSuccess: (data) => {
      const { deleted } = data;

      queryClient.setQueryData(
        [queryKeys.user],
        (oldUserData: User | undefined) => {
          if (!oldUserData) return oldUserData;
          const newUserData = { ...oldUserData };
          newUserData.userInfo.accounts = newUserData.userInfo.accounts.filter(
            (accountId) => accountId !== deleted
          );
          return newUserData;
        }
      );

      queryClient.setQueryData<Account[]>(
        [queryKeys.accounts],
        (oldAccounts) => {
          if (!oldAccounts) return oldAccounts;
          return oldAccounts.filter((account) => account._id !== deleted);
        }
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutate;
}
