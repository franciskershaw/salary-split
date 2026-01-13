import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import { capitaliseFirstLetter } from "@/lib/utils";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Feature } from "@/types/globalTypes";

const useReorderItems = (feature: Feature) => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const reorderItemsFn = async (itemIds: string[]) => {
    const response = await api.put(`/${feature}/reorder`, itemIds, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { mutate: reorderItems, isPending } = useMutation({
    mutationFn: reorderItemsFn,
    onSuccess: () => {
      toast.success(`${capitaliseFirstLetter(feature)} reordered successfully`);
      queryClient.invalidateQueries({ queryKey: [queryKeys[feature]] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys[feature]] });
    },
  });

  return { reorderItems, isPending };
};

export default useReorderItems;
