import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { EditAccountState } from '../../types/types';
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
      onSuccess: async () =>
        await queryClient.invalidateQueries([queryKeys.accounts]),
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return mutate;
}
