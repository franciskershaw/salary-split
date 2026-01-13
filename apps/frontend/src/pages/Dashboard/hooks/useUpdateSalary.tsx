import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { User } from "@/types/globalTypes";

const useUpdateSalary = () => {
  const api = useAxios();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const updateSalary = async (salary: number) => {
    const { data } = await api.patch(
      `/users/salary`,
      { salary },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    return data;
  };

  return useMutation({
    mutationFn: updateSalary,
    onSuccess: (data) => {
      queryClient.setQueryData([queryKeys.user], (oldData: User) => {
        return {
          ...oldData,
          takeHomePay: data.takeHomePay,
        };
      });
      toast.success("Salary updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export default useUpdateSalary;
