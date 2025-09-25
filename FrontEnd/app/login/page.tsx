"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/ui/AuthForm";
import { login } from "../services/apiAuth";
import { toast } from "sonner";
import { useLogin } from "./useLogin";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { loginUser, isPending, error } = useLogin();

  const handleLogin = async (formData: any) => {
    loginUser(formData);
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  );
}
