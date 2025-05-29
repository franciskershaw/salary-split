import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import type { AccountFormValues } from "../components/CreateAccountForm/types";

const useEditAccount = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const editAccountFn = async (account: AccountFormValues) => {
    const response = await api.put(`/accounts/${account._id}`, account, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: editAccount, isPending } = useMutation({
    mutationFn: editAccountFn,
    onSuccess: () => {
      toast.success("Account edited successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
  });

  return { editAccount, isPending };
};

export default useEditAccount;
