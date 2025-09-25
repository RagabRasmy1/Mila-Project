// hooks/useLogout.ts
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["me", "myCart"], null); // or use `invalidateQueries` to refetch
    router.push("/login");
    toast.success("تم تسجيل الخروج بنجاح");
  };

  return { logout };
}
