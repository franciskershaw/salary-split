import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { AccountFilter, User } from "@/types/globalTypes";

const useUpdateAccountFilters = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateAccountFiltersFn = async (filters: AccountFilter[]) => {
    const response = await api.put("/users/account-filters", filters, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: updateAccountFilters, isPending } = useMutation({
    mutationFn: updateAccountFiltersFn,
    onSuccess: (updatedUser) => {
      toast.success("Account filters updated successfully");
      queryClient.setQueryData([queryKeys.user], (oldData: User) => {
        if (updatedUser) {
          return {
            ...oldData,
            accountFilters: updatedUser.accountFilters,
          };
        }
        return oldData;
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return { updateAccountFilters, isPending };
};

export default useUpdateAccountFilters;
