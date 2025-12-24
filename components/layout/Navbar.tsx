"use client";

import * as React from "react";
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { routes } from "@/lib/routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/lib/queries/auth.queries";
import { clearCookies, getCookie } from "@/lib/cookieHandler";
import { authConstants } from "@/lib/constants";
import { NavbarDialog } from "./NavbarDialog";

export function Navbar() {
  const isMobile = useIsMobile();
  const [IsNavbarOpen, setIsNavbarOpen] = React.useState(false);

  return (
    <div className="flex justify-between items-center h-20">
      <NavigationMenu
        viewport={isMobile}
        className="flex justify-between items-center h-full"
      >
        <h2 className="text-2xl text-primary font-extrabold">Recipe</h2>
        <NavigationMenuList className="flex-wrap ms-30 gap-8 max-lg:hidden ">
          <NavigationMenuItem>
            <NavigationMenuLink href={routes.public.home}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href={routes.public.recipes}>
              Recipes
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href={routes.private.addRecipe}>
              Add Recipe
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-8 items-center">
        <div className="lg:hidden">
          <NavbarDialog />
        </div>
        <Profile />
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function Profile() {
  const { user } = useAuthStore();
  const { mutate } = useLogout();

  const handleLogout = () => {
    const deviceId = getCookie(authConstants.deviceId);
    console.log("deviceId", deviceId);
    if (deviceId) {
      mutate({ deviceId });
    }
  };

  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>My Recipes</DropdownMenuItem>
          <DropdownMenuItem>Saved</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive!"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <a
      href={routes.auth.login}
      className="flex items-center gap-2 text-base font-medium"
    >
      <LogIn color="#000000" className="w-5 h-5" />
      Login
    </a>
  );
}
