import { useQuery } from "@tanstack/react-query";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Bill } from "@/types/globalTypes";

const useGetBills = () => {
  const api = useAxios();
  const { user } = useUser();

  const getBills = async (): Promise<Bill[]> => {
    const response = await api.get("/bills", {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { data: bills, isLoading: fetchingBills } = useQuery({
    queryKey: [queryKeys.bills],
    queryFn: getBills,
    retry: false,
  });

  return { bills, fetchingBills };
};

export default useGetBills;
