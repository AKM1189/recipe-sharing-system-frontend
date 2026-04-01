"use client";
import {
  useGetFavouriteRecipes,
  useGetRecipesByUser,
} from "@/lib/queries/recipe.queries";
import { useEffect } from "react";
import RecipesSection from "../recipes/RecipesSection";

const MyRecipesList = () => {
  const { data } = useGetRecipesByUser();
  useEffect(() => {
    console.log("my recipes", data);
  }, [data]);
  if (data)
    return (
      <div>
        <RecipesSection
          title="My Recipes"
          description="Explore our latest recipes, from quick snacks to hearty meals and
        indulgent desserts."
          recipes={data?.data}
        />
      </div>
    );
};

export default MyRecipesList;
