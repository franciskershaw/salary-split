import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useReorderSavings = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const reorderSavingsFn = async (savingIds: string[]) => {
    const response = await api.put("/savings/reorder", savingIds, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: reorderSavings, isPending } = useMutation({
    mutationFn: reorderSavingsFn,
    onSuccess: () => {
      toast.success("Savings reordered successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.savings] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.savings] });
    },
  });

  return { reorderSavings, isPending };
};

export default useReorderSavings;
