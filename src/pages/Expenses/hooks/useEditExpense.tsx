import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import type { ExpenseFormValues } from "../components/CreateExpenseForm/types";

const useEditExpense = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const editExpenseFn = async (expense: ExpenseFormValues) => {
    const { _id, ...expenseData } = expense;
    const response = await api.put(`/expenses/${_id}`, expenseData, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: editExpense, isPending } = useMutation({
    mutationFn: editExpenseFn,
    onSuccess: () => {
      toast.success("Expense edited successfully");
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

  return { editExpense, isPending };
};

export default useEditExpense;
