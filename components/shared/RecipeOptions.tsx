import { useAuthStore } from "@/store/auth.store";

import { useEffect, useRef, useState } from "react";
import {
  useAddToFavourite,
  useDeleteRecipe,
  useGetFavourites,
  useRemoveFromFavourite,
} from "@/lib/queries/recipe.queries";
import { useConfirmStore } from "@/store/confirm.store";
import CardActionIcon from "../recipes/CardActionIcon";
import {
  Clock,
  Heart,
  Pen,
  Printer,
  Share,
  Star,
  Trash2,
  Utensils,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { Recipe } from "@/types";
import { Favourite } from "@/types/favourite";
import { useReactToPrint } from "react-to-print";
import PrintRecipe from "../recipeDetail/PrintRecipe";

const RecipeOptions = ({
  recipe,
  align = "vertical",
  isDetail = false,
}: {
  recipe: Recipe;
  align?: "horizontal" | "vertical";
  isDetail?: boolean;
}) => {
  const router = useRouter();
  const { data: favourites } = useGetFavourites();
  const { user } = useAuthStore();
  const { mutate: addToFavourite } = useAddToFavourite();
  const { mutate: removeFromFavourite } = useRemoveFromFavourite();
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const [isLiked, setIsLiked] = useState(false);
  const { showConfirm } = useConfirmStore();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const isFavourite = favourites?.some(
      (item: Favourite) => item.recipeId === recipe.id,
    );
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
  const handlePrintClick = () => {
    reactToPrintFn();
  };

  return (
    <div
      className={align === "horizontal" ? "flex gap-3" : "flex flex-col gap-3"}
    >
      <CardActionIcon
        tooltip="Save To Favourites"
        icon={
          <Heart
            size={22}
            color="var(--color-primary)"
            fill={isLiked ? "var(--color-primary)" : "white"}
          />
        }
        handleClick={handleFavouriteClick}
      />

      {isDetail && (
        <>
          <CardActionIcon
            tooltip="Print"
            icon={<Printer size={22} color="var(--color-primary)" />}
            handleClick={handlePrintClick}
          />
        </>
      )}

      {user?.id === recipe.userId && (
        <CardActionIcon
          tooltip="Edit"
          icon={<Pen size={22} color="var(--color-primary)" fill="white" />}
          handleClick={handleUpdateClick}
        />
      )}

      {user?.id === recipe.userId && (
        <CardActionIcon
          tooltip="Delete"
          icon={<Trash2 size={22} color="var(--color-primary)" fill="white" />}
          handleClick={handleDeleteClick}
        />
      )}

      {/* print content */}
      <div className="hidden">
        <PrintRecipe recipe={recipe} ref={contentRef} />
      </div>
    </div>
  );
};

export default RecipeOptions;
