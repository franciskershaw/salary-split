import { useQuery } from "@tanstack/react-query";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { Account } from "@/types/globalTypes";

const useGetAccounts = () => {
  const api = useAxios();
  const { user } = useUser();

  const getAccounts = async (): Promise<Account[]> => {
    const response = await api.get("/accounts", {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { data: accounts, isLoading: fetchingAccounts } = useQuery({
    queryKey: [queryKeys.accounts],
    queryFn: getAccounts,
    retry: false,
  });

  return { accounts, fetchingAccounts };
};

export default useGetAccounts;
