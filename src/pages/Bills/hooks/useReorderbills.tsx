import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useReorderBills = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const reorderBillsFn = async (billIds: string[]) => {
    const response = await api.put("/bills/reorder", billIds, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: reorderBills, isPending } = useMutation({
    mutationFn: reorderBillsFn,
    onSuccess: () => {
      toast.success("Bills reordered successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.bills] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.bills] });
    },
  });

  return { reorderBills, isPending };
};

export default useReorderBills;
