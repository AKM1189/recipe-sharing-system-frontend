"use client";

import { routes } from "@/lib/routes";
import { Recipe } from "@/types";
import { Clock, Heart, Pen, Star, Trash2, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";

import { Favourite } from "@/types/favourite";
import Image from "../common/Image";
import RecipeOptions from "../shared/RecipeOptions";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  return (
    <div
      className="h-full flex flex-col max-w-[300px] gap-3 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => router.push(`${routes.public.recipes}/${recipe.id}`)}
    >
      <div className="relative bg-gray-200 rounded-lg">
        <Image
          publicId={recipe.imageUrl}
          className="aspect-square w-full min-w-[300px] h-auto min-h-[400px] rounded-lg object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-white py-1.5 px-3 rounded-full">
          <Star fill="orange" color="orange" size={18} />{" "}
          <span className="text-sm font-semibold">
            {parseInt(recipe.rating) === 0
              ? "N/A"
              : parseFloat(recipe.rating).toFixed(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <RecipeOptions recipe={recipe} />
        </div>
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
