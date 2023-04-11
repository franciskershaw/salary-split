import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { EditAccountState } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';
import { Account } from '../../types/types';

export function useEditAccount(accountId: string) {
  const { editAccount } = useAccountRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: EditAccountState) => editAccount(accountId, formData),
    {
      onSuccess: (data) => {
        const updatedAccount = data;
        queryClient.setQueryData<Account[]>(
          [queryKeys.accounts],
          (oldAccounts: Account[] | undefined) => {
            if (!oldAccounts) {
              return oldAccounts;
            }

            return oldAccounts.map((account: Account) =>
              account._id === accountId ? updatedAccount : account
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
