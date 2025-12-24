"use client";

import { Recipe } from "@/types";
import { Clock, Utensils } from "lucide-react";
import Image from "next/image";

export default function RecipeCard({
  key,
  recipe,
}: {
  key: string;
  recipe: Recipe;
}) {
  return (
    <div key={key} className="h-full flex flex-col rounded-xl overflow-hidden">
      <img
        className="aspect-[1/1] w-full min-w-[300px] h-auto min-h-[400px] rounded-lg"
        src={process.env.NEXT_PUBLIC_IMAGE_URL + recipe.imageUrl}
        alt={recipe.title}
      />
      {recipe.category}
      <h1 className="text-xl font-semibold">{recipe.title}</h1>
      <p className="flex gap-1 items-center">
        <Clock size={16} />
        <span> {recipe.cookingTime} mins</span>
      </p>
      <p className="flex gap-1 items-center">
        <Utensils size={16} /> {recipe.serving} servings
      </p>
    </div>
  );
}
