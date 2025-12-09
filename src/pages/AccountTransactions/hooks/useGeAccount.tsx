import { useQuery } from "@tanstack/react-query";

import useAxios from "@/hooks/axios/useAxios";
import useUser from "@/hooks/user/useUser";
import queryKeys from "@/tanstackQuery/queryKeys";

const useGetAccount = (accountId: string) => {
  const api = useAxios();
  const { user } = useUser();

  const getAccountTransactions = async () => {
    const response = await api.get(`/accounts/${accountId}/transactions`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data;
  };

  const { data: account, isLoading: fetchingAccount } = useQuery({
    queryKey: [queryKeys.accounts, accountId],
    queryFn: getAccountTransactions,
    retry: false,
  });

  return { account, fetchingAccount };
};

export default useGetAccount;
