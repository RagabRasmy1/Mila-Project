// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/apiAuth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      // Save token
      if (data?.token) {
        localStorage.setItem("token", data.token);

        // Invalidate and refetch the user data
        await queryClient.invalidateQueries({ queryKey: ["me", "myCart"] });

        toast.success("تم تسجيل الدخول بنجاح!");
        router.push("/");
      } else {
        toast.error("Login succeeded but token missing.");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "فشل تسجيل الدخول.");
    },
  });

  return { loginUser, isPending, error };
}
