"use client";
import { Recipe } from "@/types";
import React, { useEffect, useState } from "react";
import RatingProgressList from "./RatingProgress";
import StarIcon from "@/components/common/StarIcon";
import { useGetRecipeById } from "@/lib/queries/recipe.queries";

const RatingOverview = ({ recipeId }: { recipeId: number }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { data } = useGetRecipeById(recipeId);
  useEffect(() => {
    if (data?.success) {
      setRecipe(data?.data);
    }
  }, [data]);

  if (recipe)
    return (
      <div>
        <h1 className="text-xl font-semibold">Rating Oveviews</h1>
        {recipe && parseInt(recipe.rating) === 0 ? (
          <div className="mt-5 text-sm text-muted-foreground">
            No ratings yet
          </div>
        ) : (
          <div className="flex gap-10 items-center mt-8">
            <div>
              <p className="mb-2 font-bold">
                <span className="text-5xl text-gray-800">
                  {parseInt(recipe.rating) > 0
                    ? parseFloat(recipe.rating).toFixed(1)
                    : recipe.rating}
                </span>
                / 5
              </p>
              <StarIcon fillCount={5} />
              <p className="text-muted-foreground text-sm mt-1">
                {recipe.ratingCount} ratings
              </p>
            </div>
            <div className="flex flex-col gap-3 w-[500px]">
              <RatingProgressList reviews={recipe.reviews} />
            </div>
          </div>
        )}
      </div>
    );
};

export default RatingOverview;
