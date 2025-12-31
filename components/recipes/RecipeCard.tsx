"use client";

import { routes } from "@/lib/routes";
import { useAuthStore } from "@/store/auth.store";
import { Recipe } from "@/types";
import { Clock, Edit, Pen, Utensils } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecipeCard({
  key,
  recipe,
}: {
  key: number;
  recipe: Recipe;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  return (
    <div
      key={key}
      className="h-full flex flex-col max-w-[300px] gap-3 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => router.push(`${routes.public.recipes}/${recipe.id}`)}
    >
      <div className="relative">
        <img
          className="aspect-[1/1] w-full min-w-[300px] h-auto min-h-[400px] rounded-lg"
          src={process.env.NEXT_PUBLIC_IMAGE_URL + recipe.imageUrl}
          alt={recipe.title}
        />
        {user?.id === recipe.userId && (
          <span
            className="absolute top-5 right-3 w-8 h-8 bg-white shadow-md rounded-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`${routes.private.updateRecipe}/${recipe.id}`);
            }}
          >
            <Pen size={16} color="var(--color-primary)" />
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {recipe.categories.map((category) => (
          <div
            key={category.category.id}
            className="text-primary uppercase font-semibold text-sm"
          >
            {category.category.name}
          </div>
        ))}
      </div>
      <h1 className="text-xl font-semibold hover:text-primary transition-colors duration-200">
        {recipe.title}
      </h1>
      <p className="flex items-center gap-5">
        <span className="flex gap-1 items-center">
          <Clock size={16} />
          <span> {recipe.cookingTime} mins</span>
        </span>
        <span className="flex gap-1 items-center">
          <Utensils size={16} /> {recipe.serving} servings
        </span>
      </p>
    </div>
  );
}
