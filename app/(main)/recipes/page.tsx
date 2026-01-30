import RecipesSection from "@/components/recipes/RecipesSection";
import { Input } from "@/components/ui/input";
import { getRecipes } from "@/lib/api/recipe.api";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";
import { Recipe } from "@/types";
import { Search, Utensils, X } from "lucide-react";
import Form from "next/form";
import Link from "next/link";

export default async function Recipes({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const recipes: { data: Recipe[]; error: string | undefined } =
    await serverFetch(`${endpoints.recipe}?query=${query}`);
  return (
    <div className="relative mt-20 flex flex-col items-center w-full">
      <h1 className="text-5xl font-bold mb-5">All Recipes</h1>
      <p className="max-w-[800px] text-center leading-8">
        Discover a wide range of delicious recipes. Browse by category, explore
        new ideas, or use AI-powered search to find the perfect recipe for any
        occasion.
      </p>

      <div className="relative mt-16 gap-5">
        <Form action="/recipes">
          <div className="relative w-[600px] flex items-center">
            <div className="absolute left-5">
              <Utensils color="var(--color-primary)" />
            </div>
            <Input
              name="query"
              placeholder="Find recipes to cook today"
              className="ps-16 bg-white! focus:outline-0! focus:ring-0! h-14 text-[16px]! shadow-md rounded-full"
            />
            <button
              type="submit"
              className="absolute right-2 w-10 h-10 rounded-full bg-primary flex justify-center items-center"
            >
              <Search color="#ffffff" className="w-6 h-6" />
            </button>
          </div>
        </Form>
      </div>

      <div className=" w-full">
        <RecipesSection title="" description="" recipes={recipes.data} />
      </div>
    </div>
  );
}
