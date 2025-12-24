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
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function NavbarDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Menu />
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center sm:max-w-full h-full rounded-none">
        <DialogTitle></DialogTitle>

        <div className="flex flex-col justify-center items-center gap-12 [&>*]:font-medium [&>*]:hover:bg-accent [&>*]:px-5 [&>*]:py-2 [&>*]:rounded-md [&>*]:transaction-all [&>*]:duration-300">
          <Link href={routes.public.home}>
            <DialogClose>Home</DialogClose>
          </Link>
          <Link href={routes.public.recipes}>
            <DialogClose>Recipes</DialogClose>
          </Link>
          <Link href={routes.public.categories}>
            <DialogClose>Categories</DialogClose>
          </Link>
          <Link href={routes.private.addRecipe}>
            <DialogClose>Add Recipe</DialogClose>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
