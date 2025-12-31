"use client";

import { Spinner } from "@/components/ui/spinner";
import { useMe } from "@/lib/queries/auth.queries";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useMe();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      setUser(user ?? null);
    }
  }, [isLoading, user]);

  console.log("isLoading", isLoading, user);
  if (isLoading)
    return (
      <div className="w-svw h-svh flex justify-center items-center">
        <Spinner className="size-12" />
      </div>
    );
  return children;
}
