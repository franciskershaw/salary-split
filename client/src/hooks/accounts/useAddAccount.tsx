import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { AddAccountState } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';
import { useUser } from '../auth/useUser';
import { useNavigate } from 'react-router-dom';

export function useAddAccount() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { addAccount } = useAccountRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: AddAccountState) => addAccount(user?.token || '', formData),
    {
      onSuccess: async (data) => {
        await queryClient.resetQueries([queryKeys.accounts]);
        await queryClient.resetQueries([queryKeys.user]);
        navigate('/accounts');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return mutate;
}
