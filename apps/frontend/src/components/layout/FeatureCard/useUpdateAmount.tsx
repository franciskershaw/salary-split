import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Account, Bill, Feature } from "@/types/globalTypes";

const useUpdateAmount = (feature: Feature) => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateAmountFn = async ({
    itemId,
    amount,
  }: {
    itemId: string;
    amount: number;
  }) => {
    const response = await api.patch(
      `/update-amount/${feature}/${itemId}`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    return response.data;
  };

  const { mutate: updateAmount, isPending } = useMutation({
    mutationFn: updateAmountFn,
    onMutate: async ({ itemId, amount }) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys[feature]] });

      const previousData = queryClient.getQueryData([queryKeys[feature]]);

      queryClient.setQueryData(
        [queryKeys[feature]],
        (old: (Account | Bill)[]) => {
          if (!old) return old;
          return old.map((item: Account | Bill) =>
            item._id === itemId ? { ...item, amount } : item
          );
        }
      );

      return { previousData };
    },
    onSuccess: (data) => {
      const updatedItem = data[feature.slice(0, -1)] || data[feature] || data;
      const itemName = updatedItem?.name || "Item";

      toast.success(`Updated ${itemName} amount successfully`);
    },
    onError: (error: AxiosError<{ message: string }>, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKeys[feature]], context.previousData);
      }

      toast.error(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys[feature]],
      });
    },
  });

  return { updateAmount, isPending };
};

export default useUpdateAmount;
