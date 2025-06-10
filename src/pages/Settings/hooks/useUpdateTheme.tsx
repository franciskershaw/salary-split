import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { User } from "@/types/globalTypes";

type Theme = "light" | "dark";

const useUpdateTheme = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateThemeFn = async (theme: Theme) => {
    const response = await api.put(
      "/users/theme",
      { defaultTheme: theme },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    return response.data;
  };

  const { mutate: updateTheme, isPending } = useMutation({
    mutationFn: updateThemeFn,
    onSuccess: (updatedUser) => {
      toast.success("Theme updated successfully");
      queryClient.setQueryData([queryKeys.user], (oldData: User) => {
        if (updatedUser) {
          return {
            ...oldData,
            defaultTheme: updatedUser.defaultTheme,
          };
        }
        return oldData;
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    },
  });

  return { updateTheme, isPending };
};

export default useUpdateTheme;
