"use client";

import { Spinner } from "@/components/ui/spinner";
import { useMe } from "@/lib/queries/auth.queries";
import { routes } from "@/lib/routes";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useMe();
  const { setUser } = useAuthStore();
  const router = useRouter();
  const isNotAuthorized =
    !isLoading &&
    !user &&
    Object.values(routes.private).some((route) => route === location.pathname);

  useEffect(() => {
    if (!isLoading) {
      setUser(user ?? null);
    }
    if (isNotAuthorized) {
      router.replace(routes.public.home);
    }
  }, [isLoading, user]);

  if (isLoading)
    return (
      <div className="w-svw h-svh flex justify-center items-center">
        <Spinner className="size-12" />
      </div>
    );
  return children;
}
