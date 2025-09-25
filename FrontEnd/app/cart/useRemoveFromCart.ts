// /hooks/useRemoveFromCart.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../services/apiCart";
import { toast } from "sonner";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCart"] });
      toast.success("تم حذف المنتج من السلة");
    },
    onError: (error: any) => {
      console.error("فشل حذف المنتج من السلة:", error);
      toast.error(error?.response?.data?.message || "فشل حذف المنتج");
    },
  });
}
