"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/lib/queries/auth.queries";
import { getCookie } from "@/lib/cookieHandler";
import { authConstants } from "@/lib/constants";
import { NavbarDialog } from "./NavbarDialog";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { routes } from "@/lib/routes";
import ProfileAvatar from "../common/ProfileAvatar";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import { TbLogout } from "react-icons/tb";
import Image from "next/image";

const menus = [
  { label: "Home", href: routes.public.home },
  { label: "Recipes", href: routes.public.recipes },
  { label: "Add Recipe", href: routes.private.addRecipe },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center h-20">
      <div className="flex items-center gap-2">
        <Image alt="Recipixa" width={40} height={40} src={"/recipe_logo.png"} />
        <h2 className="text-2xl text-primary font-extrabold">Recipixa</h2>
      </div>

      <div className="flex items-center gap-10">
        <NavigationMenu
          viewport={isMobile}
          className="flex justify-between items-center h-full"
        >
          <NavigationMenuList className="flex-wrap ms-30 gap-8 max-lg:hidden">
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.href}>
                <NavigationMenuLink
                  href={menu.href}
                  className={cn(
                    pathname === menu.href
                      ? "text-primary hover:text-primary focus:text-primary"
                      : "text-default hover:text-muted-foreground",
                  )}
                >
                  {menu.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-8 items-center">
          <div className="lg:hidden">
            <NavbarDialog />
          </div>
          <Profile pathname={pathname} />
        </div>
      </div>
    </div>
  );
}

function Profile({ pathname }: { pathname: string }) {
  const { user } = useAuthStore();
  const { mutate } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    const deviceId = getCookie(authConstants.deviceId);
    if (deviceId) mutate({ deviceId });
  };

  if (!user) {
    return (
      <Link
        href={routes.auth.login}
        className="flex items-center gap-2 text-base font-medium"
      >
        <LogIn color="#000000" className="w-5 h-5" />
        Login
      </Link>
    );
  }

  const dropdownItems = [
    { label: "Profile", href: routes.private.profile },
    { label: "My Recipes", href: routes.private.myRecipe },
    { label: "Favourites", href: routes.private.favourites },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <ProfileAvatar profileUrl={user.profileUrl} />
        <span className="w-32 truncate">{user.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownItems.map((item) => (
          <DropdownMenuItem
            key={item.href}
            className={cn(
              pathname === item.href ? "text-primary" : "",
              "hover:text-primary",
            )}
            onClick={() => router.push(item.href)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          // className="text-destructive hover:text-destructive!"
          onClick={handleLogout}
        >
          <TbLogout size={25} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
