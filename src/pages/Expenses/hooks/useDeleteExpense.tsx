import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useDeleteExpense = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const deleteExpenseFn = async (expenseId: string) => {
    const response = await api.delete(`/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: deleteExpense, isPending } = useMutation({
    mutationFn: deleteExpenseFn,
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.expenses] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.expenses] });
    },
  });

  return { deleteExpense, isPending };
};

export default useDeleteExpense;
