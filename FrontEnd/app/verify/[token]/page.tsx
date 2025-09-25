"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import api from "@/app/services/axiosInstance";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  console.log("Verification token:", token);

  useEffect(() => {
    async function verify() {
      try {
        const res = await api.get(`/verify/${token}`);
        toast.success(res.data.message || "تم تفعيل حسابك بنجاح 🎉");
        router.push("/login");
      } catch (err: any) {
        toast.error(
          err.response?.data?.message ||
            "فشل التحقق. قد يكون الرابط غير صالح أو منتهي الصلاحية."
        );
      }
    }
    if (token) verify();
  }, [token, router]);

  return <p className="text-center mt-10">جاري التحقق من حسابك...</p>;
}
