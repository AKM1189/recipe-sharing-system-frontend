import RecipesSection from "@/components/recipes/RecipesSection";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";
import { Recipe } from "@/types";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const recipes: { data: Recipe[]; error: string | undefined } =
    await serverFetch(`${endpoints.recipe}?query=${query}`);
  console.log("search recipe", recipes);
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
