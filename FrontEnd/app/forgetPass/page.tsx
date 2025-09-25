"use client";

import { useState } from "react";
import api from "@/app/services/axiosInstance";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/forget-password", { email });
      toast.success(
        res.data.message ||
          "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني."
      );
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "حدث خطأ أثناء إرسال البريد الإلكتروني."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4 text-center">نسيت كلمة المرور؟</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
            placeholder="example@email.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#DB2777] text-white p-2 rounded hover:bg-pink-700"
        >
          إرسال رابط إعادة التعيين
        </button>
      </form>
    </div>
  );
}
