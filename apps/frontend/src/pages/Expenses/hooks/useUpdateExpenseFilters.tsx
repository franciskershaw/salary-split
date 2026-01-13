import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { BillFilter, User } from "@/types/globalTypes";

const useUpdateExpenseFilters = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateExpenseFiltersFn = async (filters: BillFilter[]) => {
    const response = await api.put("/users/expense-filters", filters, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: updateExpenseFilters, isPending } = useMutation({
    mutationFn: updateExpenseFiltersFn,
    onSuccess: (updatedUser) => {
      toast.success("Expense filters updated successfully");
      queryClient.setQueryData([queryKeys.user], (oldData: User) => {
        if (updatedUser) {
          return {
            ...oldData,
            expenseFilters: updatedUser.expenseFilters,
          };
        }
        return oldData;
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return { updateExpenseFilters, isPending };
};

export default useUpdateExpenseFilters;
