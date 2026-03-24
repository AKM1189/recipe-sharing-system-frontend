import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { routes } from "@/lib/routes";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MenuType } from "./Navbar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavbarDialog({ menus }: { menus: MenuType[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        <Menu />
      </div>
      <div
        className={twMerge(
          "flex flex-col justify-center sm:max-w-full h-full rounded-none",
          !open && "hidden",
        )}
      >
        <div className="min-w-[400px] fixed top-0 left-0 bg-background w-full h-full z-100 flex flex-col justify-center items-center gap-12">
          {menus.map((menu, index) => (
            <Link
              href={menu.href}
              key={index}
              className={cn(
                "font-medium text-default hover:text-muted-foreground hover:bg-accent px-5 py-2 rounded-md transaction-all duration-300",
                pathname === menu.href
                  ? "text-primary hover:text-primary focus:text-primary"
                  : "",
              )}
            >
              {menu.label}
            </Link>
          ))}
          <button
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
