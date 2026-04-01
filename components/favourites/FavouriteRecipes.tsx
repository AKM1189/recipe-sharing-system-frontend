"use client";
import { useGetFavouriteRecipes } from "@/lib/queries/recipe.queries";
import React, { useEffect } from "react";
import RecipesSection from "../recipes/RecipesSection";

const FavouriteRecipes = () => {
  const { data } = useGetFavouriteRecipes();
  if (data)
    return (
      <div>
        <RecipesSection
          title="Favourite Recipes"
          description="Explore our latest recipes, from quick snacks to hearty meals and
        indulgent desserts."
        />
      </div>
    );
};

export default FavouriteRecipes;
