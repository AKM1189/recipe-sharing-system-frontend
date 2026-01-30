import { ErrorState } from "@/components/common/ErrorState";
import RecipesGrid from "@/components/recipes/RecipeGrid";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { dummyRecipes } from "@/data";
import { serverFetch } from "@/lib/api/server-api";
import { constants } from "@/lib/constants";
import { endpoints } from "@/lib/endpoints";
import { Category, Recipe } from "@/types";
import { Search, Utensils } from "lucide-react";
import Recipes from "./recipes/page";
import RecipesSection from "@/components/recipes/RecipesSection";
import Link from "next/link";
import Form from "next/form";
import Categories from "@/components/categories/Categories";

export default async function Home() {
  const recipes: { data: Recipe[]; error: string | undefined } =
    await serverFetch(endpoints.recipe);
  const categories: { data: Category[]; error: string | undefined } =
    await serverFetch(endpoints.category);

  // const categories = [
  //   "APPETIZERS",
  //   "DRINKS",
  //   "DESSERTS",
  //   "SNACKS",
  //   "BREADS",
  //   "BREAKFASTS",
  //   "HEALTHY",
  //   "MEAT",
  //   "APPETIZERS",
  //   "DRINKS",
  //   "DESSERTS",
  //   "SNACKS",
  //   "BREADS",
  //   "BREAKFASTS",
  //   "HEALTHY",
  //   "MEAT",
  // ];

  if (recipes.error === "SERVER_UNREACHABLE") {
    return (
      <ErrorState
        title="Service temporarily unavailable"
        message="We can’t connect to the server right now. Please try again later."
      />
    );
  }
  console.log("categories", categories);

  return (
    <div>
      <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-5xl font-bold">{constants.title}</h1>
          <p className="leading-6 mt-3">
            Explore and share daily cooking ideas with our recipes. Discover
            dishes, videos, tips, and inspiration tailored to your tastes and
            the community you connect with.
          </p>
        </div>

        <Form action="/recipes">
          <div className="relative w-[600px] mt-16 flex items-center">
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

        <Categories categories={categories} />
      </div>

      {/* recipes list */}
      <RecipesSection
        title="New Recipes"
        description="Explore our latest recipes, from quick snacks to hearty meals and
        indulgent desserts."
        recipes={recipes.data}
      />
    </div>
  );
}
