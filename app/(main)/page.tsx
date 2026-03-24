import { ErrorState } from "@/components/common/ErrorState";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";
import { Category, Recipe } from "@/types";
import RecipesSection from "@/components/recipes/RecipesSection";
import Categories from "@/components/categories/Categories";
import RecipeSearchBar from "@/components/shared/RecipeSearchBar";
import { constants } from "@/lib/constants";

export default async function Home() {
  // const recipes: { data: Recipe[] | null; error?: string | undefined } =
  //   await serverFetch(endpoints.recipe, { page: 2 });
  const categories: { data: Category[] | null; error?: string | undefined } =
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
  // if (recipes.error === "SERVER_UNREACHABLE") {
  //   return (
  //     <ErrorState
  //       title="Service temporarily unavailable"
  //       message="We can’t connect to the server right now. Please try again later."
  //     />
  //   );
  // }

  return (
    <div>
      <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <RecipeSearchBar
          title={constants.title}
          description={
            "Explore and share daily cooking ideas with our recipes. Discover dishes, videos, tips, and inspiration tailored to your tastes and the community you connect with."
          }
        />

        {categories && <Categories categories={categories} />}
      </div>

      {/* recipes list */}
      <RecipesSection
        title="New Recipes"
        description="Explore our latest recipes, from quick snacks to hearty meals and
        indulgent desserts."
        // recipes={recipes.data}
      />
    </div>
  );
}
