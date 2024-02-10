import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountRequests } from '../requests/useAccountRequests';
import { AddAccountState, User, Account } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../context/Context';

export function useAddAccount() {
  const navigate = useNavigate();
  const { setDefaultId } = useContext(Context);
  const { addAccount } = useAccountRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: AddAccountState) => addAccount(formData),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(
          [queryKeys.user],
          (oldUserData: User | undefined) => {
            if (!oldUserData) {
              return undefined;
            }
            const newUserData = { ...oldUserData };
            newUserData.userInfo.accounts.push(data.account._id);
            return newUserData;
          }
        );

        const { account } = data;
        queryClient.setQueryData<Account[]>(
          [queryKeys.accounts],
          (oldAccounts: Account[] | undefined) => {
            if (!oldAccounts) return oldAccounts;
            if (oldAccounts.length < 1 && account) {
              setDefaultId(account._id)
            }
            return [...oldAccounts, account];
          }
        );

        navigate('/accounts');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return mutate;
}
