import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useDeleteBill = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const deleteBillFn = async (billId: string) => {
    const response = await api.delete(`/bills/${billId}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: deleteBill, isPending } = useMutation({
    mutationFn: deleteBillFn,
    onSuccess: () => {
      toast.success("Bill deleted successfully");
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

  return { deleteBill, isPending };
};

export default useDeleteBill;
