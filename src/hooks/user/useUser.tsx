import { useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "@/hooks/axios/useAxios";
import queryKeys from "@/tanstackQuery/queryKeys";
import type { User } from "@/types/globalTypes";

const useUser = () => {
  const api = useAxios();
  const queryClient = useQueryClient();

  const getUser = async (): Promise<User | null> => {
    try {
      const response = await api.get("/auth/refresh-token");
      if (response?.status === 200) {
        const userResponse = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        });
        return userResponse.data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const { data: user, isFetching: fetchingUser } = useQuery<User | null>({
    queryKey: [queryKeys.user],
    queryFn: getUser,
    retry: false,
  });

  function updateUser(newUser: User) {
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  async function clearUser() {
    try {
      await api.post("/auth/logout");
      queryClient.setQueryData([queryKeys.user], null);
      queryClient.removeQueries({ queryKey: [queryKeys.accounts] });
      queryClient.removeQueries({ queryKey: [queryKeys.bills] });
      queryClient.removeQueries({ queryKey: [queryKeys.expenses] });
      queryClient.removeQueries({ queryKey: [queryKeys.savings] });
    } catch (error) {
      console.error(error);
    }
  }

  return { user: user ?? null, fetchingUser, updateUser, clearUser };
};

export default useUser;
