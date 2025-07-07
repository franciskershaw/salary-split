import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useDeleteAccount = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const deleteAccountFn = async (accountId: string) => {
    const response = await api.delete(`/accounts/${accountId}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: deleteAccountFn,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
  });

  return { deleteAccount, isPending };
};

export default useDeleteAccount;
