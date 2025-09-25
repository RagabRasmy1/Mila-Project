// hooks/useAddToCart.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/apiCart";
import { toast } from "sonner"; // or any notification system

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success("تمت الاضافه الي السله");
      queryClient.invalidateQueries({ queryKey: ["myCart"] });
    },
    onError: (error) => {
      console.log(error);
      const message =
        error?.response?.data?.message || error.message || "حدث خطأ";
      toast.error(message);
    },
  });
};
