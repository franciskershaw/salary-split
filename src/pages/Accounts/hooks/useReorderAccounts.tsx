import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useReorderAccounts = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const reorderAccountsFn = async (accountIds: string[]) => {
    const response = await api.put("/accounts/reorder", accountIds, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: reorderAccounts, isPending } = useMutation({
    mutationFn: reorderAccountsFn,
    onSuccess: () => {
      toast.success("Accounts reordered successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
  });

  return { reorderAccounts, isPending };
};

export default useReorderAccounts;
