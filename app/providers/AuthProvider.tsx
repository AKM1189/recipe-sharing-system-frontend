"use client";

import { useMe } from "@/lib/queries/auth.queries";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useMe();
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(user);
  }, [user]);

  if (isLoading) return null;
  return children;
}
