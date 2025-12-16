"use client";

import { Recipe } from "@/types";
import Image from "next/image";

export default function RecipeCard({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-4 gap-10">
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Image
            width={200}
            height={400}
            className="w-[300px] h-[400px] rounded-lg"
            src={"/recipe_1.jpg"}
            alt={recipe.title}
          />
          {recipe.category}
          <h1>{recipe.title}</h1>
          <p>{recipe.cookingTime} mins</p>
          <p>{recipe.serving} servings</p>
        </div>
      ))}
    </div>
  );
}
