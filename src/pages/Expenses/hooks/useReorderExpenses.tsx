import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useReorderExpenses = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const reorderExpensesFn = async (expenseIds: string[]) => {
    const response = await api.put("/expenses/reorder", expenseIds, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: reorderExpenses, isPending } = useMutation({
    mutationFn: reorderExpensesFn,
    onSuccess: () => {
      toast.success("Expenses reordered successfully");
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

  return { reorderExpenses, isPending };
};

export default useReorderExpenses;
