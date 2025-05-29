import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { User } from "@/types/globalTypes";

import type { AccountFormValues } from "../components/CreateAccountForm/types";

const useEditAccount = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const editAccountFn = async (account: AccountFormValues) => {
    const { _id, ...accountData } = account;
    const response = await api.put(`/accounts/${_id}`, accountData, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: editAccount, isPending } = useMutation({
    mutationFn: editAccountFn,
    onSuccess: ({ updatedUser }) => {
      toast.success("Account edited successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      queryClient.setQueryData([queryKeys.user], (oldData: User) => {
        return {
          ...oldData,
          defaultAccount: updatedUser.defaultAccount,
        };
      });
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
