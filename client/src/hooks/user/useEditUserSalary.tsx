import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserRequests } from '../requests/useUserRequests';
import { useUser } from '../auth/useUser';
import { EditSalaryState, User } from '../../types/types';
import { queryKeys } from '../../reactQuery/queryKeys';

export function useEditUserSalary() {
  const { user } = useUser();
  const { editUserSalary } = useUserRequests();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: EditSalaryState) => editUserSalary(user, formData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData<User>(
          [queryKeys.user],
          (prevUser: User | undefined) => {
            if (!prevUser) return prevUser;
            const updatedUser = prevUser;
            updatedUser.userInfo.monthlySalary = variables.monthlySalary;
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
