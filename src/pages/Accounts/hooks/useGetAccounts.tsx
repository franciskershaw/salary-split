import { useMemo } from "react";

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

  const accountsWhichAcceptFunds = useMemo(
    () =>
      accounts
        ?.filter((account) => account.acceptsFunds)
        .map((account) => ({
          value: account._id,
          label: `${account.name}${account.institution ? ` (${account.institution})` : ""}`,
        })),
    [accounts]
  );

  return { accounts, fetchingAccounts, accountsWhichAcceptFunds };
};

export default useGetAccounts;
