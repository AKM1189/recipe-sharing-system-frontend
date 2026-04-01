import RecipesGrid from "@/components/recipes/RecipeGrid";
import RecipesSection from "@/components/recipes/RecipesSection";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";

export default async function RecipesByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const recipes = await serverFetch(`${endpoints.recipe}/category/${category}`);
  return (
    <div className="mt-10">
      <div className="relative mt-20 flex flex-col items-center">
        <div className="text-center">
          {/* <h1 className=" font-semibold mb-5">Recipes</h1> */}
          <h1 className="text-4xl font-semibold mb-5">
            Recipes for{" "}
            <span className="text-primary">
              {category.replace("%20", " ").toUpperCase()}
            </span>
          </h1>
          <p className="mb-5 max-w-[800px] text-center leading-8">
            Browse delicious recipes grouped by category for easy discovery.
          </p>
        </div>
        <div className="text-sm">
          Total{" "}
          <span className="text-primary">{recipes?.data?.length ?? 0}</span>{" "}
          recipes
        </div>
        <div className="min-w-0 w-full mt-20">
          {Array.isArray(recipes.data) && (
            <RecipesGrid recipes={recipes.data} />
          )}
        </div>
      </div>
    </div>
  );
}
