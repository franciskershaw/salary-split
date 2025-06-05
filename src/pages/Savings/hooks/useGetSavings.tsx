import { useQuery } from "@tanstack/react-query";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Bill } from "@/types/globalTypes";

const useGetSavings = () => {
  const api = useAxios();
  const { user } = useUser();

  const getSavings = async (): Promise<Bill[]> => {
    const response = await api.get("/savings", {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { data: savings, isLoading: fetchingSavings } = useQuery({
    queryKey: [queryKeys.savings],
    queryFn: getSavings,
    retry: false,
  });

  return { savings, fetchingSavings };
};

export default useGetSavings;
