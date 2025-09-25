"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/ui/AuthForm";
import { register } from "../services/apiAuth";
import { toast } from "sonner";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await register(formData);
      toast.success(
        "تم التسجيل بنجاح! تحقق من بريدك الإلكتروني لتفعيل الحساب."
      );
      setTimeout(() => {
        router.push("/check-email");
      }, 1500);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      isLoading={isLoading}
      error={error}
    />
  );
}
