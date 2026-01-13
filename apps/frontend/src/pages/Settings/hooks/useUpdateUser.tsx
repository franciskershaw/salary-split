import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

import { type UserFormValues } from "../Settings";

const useUpdateUser = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateUserFn = async (updatedUser: Partial<UserFormValues>) => {
    const response = await api.put(`/users`, updatedUser, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
      toast.success("User updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });

  return { updateUser, isPending };
};

export default useUpdateUser;
