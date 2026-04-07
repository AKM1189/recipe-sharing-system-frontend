"use client";
import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

const RecipesGrid = ({ recipes }: { recipes: Recipe[] }) => {
  console.log("recipes", recipes);
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesGrid;
