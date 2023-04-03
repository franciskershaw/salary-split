import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { AddAccountState, User } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';
import { useUser } from '../auth/useUser';
import { useNavigate } from 'react-router-dom';

export function useAddAccount() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { addAccount } = useAccountRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: AddAccountState) =>
      addAccount(user?.accessToken || '', formData),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(
          [queryKeys.user],
          (oldUserData: User | undefined) => {
            if (!oldUserData) {
              return undefined;
            }

            const newUserData = { ...oldUserData };
            newUserData.userInfo.accounts.push(data._id);
            return newUserData;
          }
        );

        await queryClient.resetQueries([queryKeys.accounts]);

        navigate('/accounts');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return mutate;
}
