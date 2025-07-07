import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { BillFilter, User } from "@/types/globalTypes";

const useUpdateBillFilters = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateBillFiltersFn = async (filters: BillFilter[]) => {
    const response = await api.put("/users/bill-filters", filters, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: updateBillFilters, isPending } = useMutation({
    mutationFn: updateBillFiltersFn,
    onSuccess: (updatedUser) => {
      toast.success("Bill filters updated successfully");
      queryClient.setQueryData([queryKeys.user], (oldData: User) => {
        if (updatedUser) {
          return {
            ...oldData,
            billFilters: updatedUser.billFilters,
          };
        }
        return oldData;
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return { updateBillFilters, isPending };
};

export default useUpdateBillFilters;
