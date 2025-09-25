// hooks/useUpdateQuantity.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProductQuantity } from "../services/apiCart";

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductQuantity,
    onSuccess: () => {
      toast.success("تم تحديث الكمية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["myCart"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error?.message || "حدث خطأ أثناء تحديث الكمية";
      toast.error(errorMessage);
    },
  });
};
