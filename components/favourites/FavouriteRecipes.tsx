"use client";
import { useGetFavouriteRecipes } from "@/lib/queries/recipe.queries";
import React, { useEffect } from "react";
import RecipesSection from "../recipes/Recipes";

const FavouriteRecipes = () => {
  const { data } = useGetFavouriteRecipes();
  useEffect(() => {
    console.log("fav recipes", data);
  }, [data]);
  if (data)
    return (
      <div>
        <RecipesSection
          title="Favourite Recipes"
          description="Explore our latest recipes, from quick snacks to hearty meals and
        indulgent desserts."
          recipes={data}
        />
      </div>
    );
};

export default FavouriteRecipes;
