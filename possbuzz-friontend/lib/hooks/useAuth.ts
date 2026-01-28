import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "lib/api/apiIntercepters";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const res = await apiClient.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["authUser"], null);
    queryClient.invalidateQueries();
    window.location.href = "/login";
  };

  return { user, isLoading, isAuthenticated: !!user, logout };
};
