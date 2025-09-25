import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaymentOrder } from "../services/apiCart";
import { toast } from "sonner";

export const usePaymentOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PaymentOrder,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myCart"] });
      console.log("✅ Payment successful:", data);
      toast.success("تم حجز الطب بنجاح "); // Optional toast
    },

    onError: (error: any) => {
      console.error("❌ Payment error:", error.message);
      toast.error(error.message || "فشل الدفع"); // Optional toast
    },
  });
};
