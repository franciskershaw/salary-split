import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { Accounts, EditAccountState } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';
import { useUser } from '../auth/useUser';

export function useEditAccount(accountId: string) {
  const { user } = useUser();
  const { editAccount } = useAccountRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: EditAccountState) =>
      editAccount(user?.accessToken || '', accountId, formData),
    {
      onSuccess: async (response) => {
        queryClient.setQueryData(
          [queryKeys.accounts],
          (oldAccountsData: Accounts | undefined) => {
            if (!oldAccountsData) {
              return undefined;
            }
            return oldAccountsData.map((account) => {
              if (account._id === response._id) {
                return response;
              }
              return account;
            });
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
