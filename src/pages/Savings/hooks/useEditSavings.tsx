import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import type { SavingsFormValues } from "../components/CreateSavingsForm/types";

const useEditSavings = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const editSavingsFn = async (savings: SavingsFormValues) => {
    const { _id, ...savingsData } = savings;
    const response = await api.put(`/savings/${_id}`, savingsData, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: editSavings, isPending } = useMutation({
    mutationFn: editSavingsFn,
    onSuccess: () => {
      toast.success("Savings edited successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.savings] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.savings] });
    },
  });

  return { editSavings, isPending };
};

export default useEditSavings;
