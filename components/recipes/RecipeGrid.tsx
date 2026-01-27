"use client";
import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";
import { useGetFavourites } from "@/lib/queries/recipe.queries";

const RecipesGrid = ({ recipes }: { recipes: Recipe[] }) => {
  const { data: favourites } = useGetFavourites();
  return (
    <div
      // className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
      className="flex flex-wrap gap-6"
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} favourites={favourites} />
      ))}
    </div>
  );
};

export default RecipesGrid;
