import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useDeleteSavings = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const deleteSavingsFn = async (savingId: string) => {
    const response = await api.delete(`/savings/${savingId}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: deleteSavings, isPending } = useMutation({
    mutationFn: deleteSavingsFn,
    onSuccess: () => {
      toast.success("Savings deleted successfully");
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

  return { deleteSavings, isPending };
};

export default useDeleteSavings;
