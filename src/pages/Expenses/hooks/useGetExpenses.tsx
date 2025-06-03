import { useQuery } from "@tanstack/react-query";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Bill } from "@/types/globalTypes";

const useGetExpenses = () => {
  const api = useAxios();
  const { user } = useUser();

  const getExpenses = async (): Promise<Bill[]> => {
    const response = await api.get("/expenses", {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { data: expenses, isLoading: fetchingExpenses } = useQuery({
    queryKey: [queryKeys.expenses],
    queryFn: getExpenses,
    retry: false,
  });

  return { expenses, fetchingExpenses };
};

export default useGetExpenses;
