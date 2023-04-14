import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserRequests } from '../requests/useUserRequests';
import { useUser } from '../auth/useUser';
import { EditUserState, User } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';

export function useEditUser() {
  const { user } = useUser();
  const { editUser } = useUserRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: EditUserState) => editUser(user, formData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData<User>(
          [queryKeys.user],
          (prevUser: User | undefined) => {
            if (!prevUser) return prevUser;

            const updatedUser = {
              ...prevUser,
              userInfo: { ...prevUser.userInfo, ...variables },
            };

            return updatedUser;
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
