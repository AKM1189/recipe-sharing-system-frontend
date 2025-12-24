import { constants } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const medias = [
    <Instagram size={20} />,
    <Facebook size={20} />,
    <Youtube size={20} />,
    <Linkedin size={20} />,
  ];
  return (
    <div className="mb-10">
      <div className="flex max-lg:flex-col justify-center lg:justify-between items-center gap-5 border-b border-border lg:mx-20 mx-5 h-28">
        <div className="flex gap-3">
          {medias.map((item, index) => (
            <div
              className="w-10 h-10 text-primary cursor-pointer flex justify-center items-center bg-secondary rounded-full"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex gap-5 fond-medium">
          <Link href={routes.public.home}>Home</Link>
          <Link href={routes.public.recipes}>All Recipes</Link>
          <Link href={routes.public.recipes}>Terms & Conditions</Link>
          <Link href={routes.public.recipes}>Privacy Policy</Link>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mx-3">
          Platea offers a world of delicious recipes, cooking inspiration, and
          culinary tips. Explore new flavors, master techniques, and bring your
          passion for cooking to life.
        </p>

        <p className="mt-8 text-sm">
          © 2025 {constants.title}. All rights reserved. Developed by AKM
        </p>
      </div>
    </div>
  );
}
