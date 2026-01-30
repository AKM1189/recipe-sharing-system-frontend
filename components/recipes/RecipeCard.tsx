"use client";

import { routes } from "@/lib/routes";
import { useAuthStore } from "@/store/auth.store";
import { Recipe } from "@/types";
import { Clock, Heart, Pen, Star, Trash2, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import CardActionIcon from "./CardActionIcon";
import { useEffect, useState } from "react";
import {
  useAddToFavourite,
  useDeleteRecipe,
  useRemoveFromFavourite,
} from "@/lib/queries/recipe.queries";
import { Favourite } from "@/types/favourite";
import { useConfirmStore } from "@/store/confirm.store";

export default function RecipeCard({
  recipe,
  favourites = [],
}: {
  recipe: Recipe;
  favourites: Favourite[];
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: addToFavourite } = useAddToFavourite();
  const { mutate: removeFromFavourite } = useRemoveFromFavourite();
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const [isLiked, setIsLiked] = useState(false);
  const { showConfirm } = useConfirmStore();

  useEffect(() => {
    const isFavourite = favourites.some((item) => item.recipeId === recipe.id);
    setIsLiked(isFavourite);
  }, [favourites]);

  const handleFavouriteClick = () => {
    if (isLiked)
      removeFromFavourite(
        { recipeId: recipe.id },
        {
          onSuccess: () => {
            setIsLiked(false);
          },
        },
      );
    else
      addToFavourite(
        { recipeId: recipe.id },
        {
          onSuccess: () => {
            setIsLiked(true);
          },
        },
      );
  };

  const handleUpdateClick = () => {
    router.push(`${routes.private.updateRecipe}/${recipe.id}`);
  };

  const handleDeleteClick = () => {
    showConfirm({
      show: true,
      title: "Delete Recipe",
      body: "Are you sure you want to delete this recipe?",
      onConfirm: () => {
        deleteRecipe(
          { recipeId: recipe.id },
          {
            onSuccess: () => router.refresh(),
          },
        );
      },
    });
  };

  console.log("card", recipe);
  return (
    <div
      className="h-full flex flex-col max-w-[300px] gap-3 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => router.push(`${routes.public.recipes}/${recipe.id}`)}
    >
      <div className="relative bg-gray-200 rounded-lg">
        <img
          className="aspect-square w-full min-w-[300px] h-auto min-h-[400px] rounded-lg object-cover"
          src={process.env.NEXT_PUBLIC_IMAGE_URL + recipe.imageUrl}
          // alt={recipe.title}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-white py-1.5 px-3 rounded-full">
          <Star fill="orange" color="orange" size={18} />{" "}
          <span className="text-sm font-semibold">
            {parseInt(recipe.rating) === 0
              ? "N/A"
              : parseFloat(recipe.rating).toFixed(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-3">
          <CardActionIcon
            icon={
              <Heart
                size={22}
                color="var(--color-primary)"
                fill={isLiked ? "var(--color-primary)" : "white"}
              />
            }
            handleClick={handleFavouriteClick}
          />
          {user?.id === recipe.userId && (
            <CardActionIcon
              icon={<Pen size={22} color="var(--color-primary)" fill="white" />}
              handleClick={handleUpdateClick}
            />
          )}

          {user?.id === recipe.userId && (
            <CardActionIcon
              icon={
                <Trash2 size={22} color="var(--color-primary)" fill="white" />
              }
              handleClick={handleDeleteClick}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {recipe.categories.map((category) => (
          <div
            key={category.category.id}
            className="text-primary uppercase font-semibold text-sm"
          >
            {category.category.name}
          </div>
        ))}
      </div>
      <h1 className="text-xl font-semibold hover:text-primary transition-colors duration-200">
        {recipe.title}
      </h1>
      <p className="flex items-center gap-5">
        <span className="flex gap-1 items-center">
          <Clock size={16} />
          <span> {recipe.cookingTime} mins</span>
        </span>
        <span className="flex gap-1 items-center">
          <Utensils size={16} /> {recipe.serving} servings
        </span>
      </p>
    </div>
  );
}
