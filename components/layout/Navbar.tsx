"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { routes } from "@/lib/routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/auth.store";
import { cn, getImageUrl } from "@/lib/utils";

const menusConstant = {
  home: "Home",
  recipes: "Recipes",
  addRecipe: "Add Recipe",
};

const menus = [
  {
    label: "Home",
    href: routes.public.home,
  },
  {
    label: "Recipes",
    href: routes.public.recipes,
  },
  {
    label: "Add Recipe",
    href: routes.private.addRecipe,
  },
];

export function Navbar() {
  const isMobile = useIsMobile();
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>(menusConstant.home);
  const { pathname } = window.location;

  useEffect(() => {
    if (pathname.includes(routes.private.addRecipe)) {
      setActiveMenu(menusConstant.addRecipe);
    } else if (pathname.includes(routes.public.recipes)) {
      setActiveMenu(menusConstant.recipes);
    } else setActiveMenu(menusConstant.home);
  }, [pathname]);

  return (
    <div className="flex justify-between items-center h-20">
      <h2 className="text-2xl text-primary font-extrabold">Recipe</h2>
      <div className="flex items-center gap-10">
        <NavigationMenu
          viewport={isMobile}
          className="flex justify-between items-center h-full"
        >
          <NavigationMenuList className="flex-wrap ms-30 gap-8 max-lg:hidden ">
            {menus.map((menu, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={menu.href}
                  className={cn(
                    activeMenu === menu.label &&
                      "text-primary hover:text-primary focus:text-primary",
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
          <Profile setOpenProfileDrawer={setOpenProfileDrawer} />
        </div>
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

function Profile({
  setOpenProfileDrawer,
}: {
  setOpenProfileDrawer: (value: boolean) => void;
}) {
  const { user } = useAuthStore();
  const { mutate } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    const deviceId = getCookie(authConstants.deviceId);
    if (deviceId) {
      mutate({ deviceId });
    }
  };

  const onMyRecipesClick = () => {
    router.push(routes.private.myRecipe);
  };

  const onFavouriteClick = () => {
    router.push(routes.private.favourites);
  };
  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={
                user.profileUrl
                  ? getImageUrl(user.profileUrl)
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(routes.private.profile)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onMyRecipesClick}>
            My Recipes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onFavouriteClick}>
            Favourites
          </DropdownMenuItem>
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
