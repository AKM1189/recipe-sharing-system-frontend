"use client";

import * as React from "react";
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
import { useIsMobile } from "@/app/hooks/use-mobile";
import { routes } from "@/lib/routes";

export function Navbar() {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-between items-center h-20">
      <NavigationMenu
        viewport={isMobile}
        className="flex justify-between items-center h-full"
      >
        <h2 className="text-2xl text-primary font-extrabold">Recipe</h2>
        <NavigationMenuList className="flex-wrap ms-30 gap-8">
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
      <div>
        <a
          href={routes.auth.login}
          className="flex items-center gap-2 text-base font-medium"
        >
          <LogIn color="#000000" className="w-5 h-5" />
          Login
        </a>
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
