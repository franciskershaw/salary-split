import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Account, User } from "@/types/globalTypes";

import type { AccountFormValues } from "../components/CreateAccountForm/types";

const useAddAccount = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const addAccountFn = async (account: AccountFormValues) => {
    const response = await api.post("/accounts", account, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: addAccount, isPending } = useMutation({
    mutationFn: addAccountFn,
    onSuccess: (data: Account, variables: AccountFormValues) => {
      toast.success("Account added successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      if (variables.isDefault) {
        queryClient.setQueryData([queryKeys.user], (oldData: User) => {
          return {
            ...oldData,
            defaultAccount: data._id,
          };
        });
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
    },
  });

  return { addAccount, isPending };
};

export default useAddAccount;
