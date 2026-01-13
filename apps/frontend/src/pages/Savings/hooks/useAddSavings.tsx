import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import type { SavingsFormValues } from "../components/CreateSavingsForm/types";

const useAddSavings = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const addSavingsFn = async (savings: SavingsFormValues) => {
    const response = await api.post("/savings", savings, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: addSavings, isPending } = useMutation({
    mutationFn: addSavingsFn,
    onSuccess: () => {
      toast.success("Savings added successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.savings] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.savings] });
    },
  });

  return { addSavings, isPending };
};

export default useAddSavings;
