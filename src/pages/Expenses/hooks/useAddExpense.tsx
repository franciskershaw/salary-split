import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import type { ExpenseFormValues } from "../components/CreateExpenseForm/types";

const useAddExpense = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const addExpenseFn = async (expense: ExpenseFormValues) => {
    const response = await api.post("/expenses", expense, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: addExpense, isPending } = useMutation({
    mutationFn: addExpenseFn,
    onSuccess: () => {
      toast.success("Expense added successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.expenses] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.expenses] });
    },
  });

  return { addExpense, isPending };
};

export default useAddExpense;
