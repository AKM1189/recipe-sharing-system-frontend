"use client";
import { useConfirmStore } from "@/store/confirm.store";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/lib/queries/auth.queries";
import { authConstants } from "@/lib/constants";
import { getCookie } from "@/lib/cookieHandler";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

const Logout = () => {
  const { showConfirm } = useConfirmStore();
  const { mutate } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    const deviceId = getCookie(authConstants.deviceId);
    if (deviceId) {
      mutate(
        { deviceId },
        {
          onSuccess: () => router.push(routes.public.home),
        },
      );
    }
  };

  return (
    <Button
      className="bg-transparent text-base hover:bg-transparent text-destructive float-end w-[120px]"
      onClick={() =>
        showConfirm({
          show: true,
          title: "Logout",
          body: "Are you sure you want to log out?",
          onConfirm: handleLogout,
        })
      }
    >
      Logout <LogOut />
    </Button>
  );
};

export default Logout;
