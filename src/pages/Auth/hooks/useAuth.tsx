import { toast } from "sonner";

import useAxios from "@/hooks/axios/useAxios";

import useUser from "../../../hooks/user/useUser";

const useAuth = () => {
  const api = useAxios();
  const { clearUser, updateUser } = useUser();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response && response.status === 200) {
        updateUser(response.data);
        toast.success(`Welcome back ${response.data.name}`);
        return response.data;
      }
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        const serverError = error as {
          response: { data: { message: string } };
        };
        toast.error(serverError.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const register = async (data: {
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/auth/register", data);
      const userData = {
        ...response.data,
        name: {
          firstName: data.name.firstName,
          lastName: data.name.lastName,
        },
      };
      updateUser(userData);
      toast.success(`Welcome to Salary Split, ${data.name.firstName}`);
      return userData;
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        const serverError = error as {
          response: { data: { message: string } };
        };
        toast.error(serverError.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const logout = async () => {
    await clearUser();
    toast.success("You have been logged out.");
  };

  return { logout, login, register };
};

export default useAuth;
