import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import type { BillFormValues } from "../components/CreateBillForm/types";

const useEditBill = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const editBillFn = async (bill: BillFormValues) => {
    const { _id, ...billData } = bill;
    console.log("Original bill:", bill);
    console.log("Destructured _id:", _id);
    console.log("billData after destructuring:", billData);
    const response = await api.put(`/bills/${_id}`, billData, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: editBill, isPending } = useMutation({
    mutationFn: editBillFn,
    onSuccess: () => {
      toast.success("Bill edited successfully");
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

  return { editBill, isPending };
};

export default useEditBill;
