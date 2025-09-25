"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import api from "../../services/axiosInstance";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await api.post(`/reset-password/${token}`, {
        password,
        password_confirmation: confirm,
      });

      toast.success(res.data.message || "تم تغيير كلمة المرور بنجاح 🔐");
      router.push("/");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "فشل إعادة تعيين كلمة المرور."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-[#DB2777]">
        إعادة تعيين كلمة المرور
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور الجديدة"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="تأكيد كلمة المرور"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#DB2777] text-white p-2 rounded hover:bg-pink-700"
        >
          تغيير كلمة المرور
        </button>
      </form>
    </div>
  );
}
