import RecipesSection from "@/components/recipes/Recipes";
import { getRecipes } from "@/lib/api/recipe.api";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";
import { Recipe } from "@/types";
import Link from "next/link";

export default async function Recipes() {
  const recipes: { data: Recipe[]; error: string | undefined } =
    await serverFetch(endpoints.recipe);
  return (
    <div>
      <RecipesSection
        title="Recipes"
        description="Browse a wide variety of recipes designed for every taste and skill level. 
        From comforting classics to creative culinary delights, find the perfect dish to inspire your next meal!"
        recipes={recipes.data}
      />
    </div>
  );
}
