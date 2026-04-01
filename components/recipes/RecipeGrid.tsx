"use client";
import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

const RecipesGrid = ({ recipes }: { recipes: Recipe[] }) => {
  console.log("recipes", recipes);
  return (
    <div
      // className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
      className="flex flex-wrap gap-x-6 gap-y-12 max-sm:justify-center"
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesGrid;
