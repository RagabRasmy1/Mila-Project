// hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/apiAuth"; // Adjust the path based on your folder structure

export function useCurUser() {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes
    retry: false, // don't retry on fail (auth errors, etc.)
  });

  return {
    user,
    isLoading,
    isError,
    error,
    refetch,
  };
}
