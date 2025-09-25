import { useQuery } from "@tanstack/react-query";
import api from "../services/axiosInstance";
import { getMyCart } from "../services/apiCart";

export function useMyCart() {
  return useQuery({
    queryKey: ["myCart"],
    queryFn: getMyCart,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
