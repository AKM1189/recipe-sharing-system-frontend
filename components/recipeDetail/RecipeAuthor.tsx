"use client";

import React from "react";
import ProfileAvatar from "../common/ProfileAvatar";
import { Recipe } from "@/types";
import { formatLowerCaseName } from "@/lib/utils";
import CardActionIcon from "../recipes/CardActionIcon";
import { Heart, Pen, Trash2 } from "lucide-react";
import RecipeOptions from "../shared/RecipeOptions";
type RecipeAuthorType = { recipe: Recipe };
const RecipeAuthor: React.FC<RecipeAuthorType> = ({ recipe }) => {
  return (
    <div className="flex justify-between items-center border-b">
      <div className="flex items-center gap-5 mt-10 pb-7">
        <ProfileAvatar profileUrl={recipe.user.profileUrl} size={16} />
        <div>
          <h2 className="text-lg font-semibold">
            {formatLowerCaseName(recipe.user.name)}
          </h2>
          <p className="text-sm text-muted-foreground">Recipe Author</p>
        </div>
      </div>
      <RecipeOptions recipe={recipe} align="horizontal" />
    </div>
  );
};

export default RecipeAuthor;
