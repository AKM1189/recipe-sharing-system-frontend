import RecipeDetailItem from "@/components/recipeDetail/RecipeDetailItem";
import { Avatar } from "@/components/ui/avatar";
import { getRecipeById } from "@/lib/api/recipe.api";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";
import { formatLowerCaseName, getImageUrl } from "@/lib/utils";
import { Recipe, RecipeIngredients } from "@/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChefHat, Clock, Utensils } from "lucide-react";
import Image from "next/image";

type PageProps = {
  params: { id: string };
};

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params;
  const { data: recipe }: { data: Recipe } = await serverFetch(
    `${endpoints.recipe}/${id}`,
  );
  console.log("recipe", recipe);
  return (
    <div className="py-20 px-[100px] flex justify-center">
      <div className="flex gap-20">
        <img
          className="rounded-lg h-[700px] max-w-[500px] object-cover"
          src={getImageUrl(recipe.imageUrl)}
          alt={recipe.title}
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-5">
            {recipe.categories?.map((category) => (
              <p
                className="text-primary font-semibold text-sm"
                key={category.categoryId}
              >
                {formatLowerCaseName(category.category.name)}
              </p>
            ))}
          </div>
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="text-sm mt-4">{recipe.description}</p>
          <div className="flex gap-20 flex-wrap mt-5">
            <RecipeDetailItem
              icon={<Clock color="var(--color-muted-foreground)" size={18} />}
              data={`${recipe.cookingTime} min`}
              description="Cooking Time"
            />
            <RecipeDetailItem
              icon={
                <Utensils color="var(--color-muted-foreground)" size={18} />
              }
              data={`Serves ${recipe.serving}`}
              description="Serving"
            />
            <RecipeDetailItem
              icon={<ChefHat color="var(--color-muted-foreground)" size={18} />}
              data={`${recipe.difficulty}`}
              description="Difficulty Level"
            />
          </div>

          <div className="flex items-center gap-5 mt-10 pb-10 border-b">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{recipe.user.name}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">
                {formatLowerCaseName(recipe.user.name)}
              </h2>
              <p className="text-sm text-muted-foreground">Recipe Author</p>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Ingredients</h1>
            <div className="flex flex-col gap-5 mt-8">
              {recipe.ingredients.map(
                (ingredient: RecipeIngredients, index) => (
                  <div key={ingredient.id}>
                    <div className="flex gap-5">
                      <span className="font-bold">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <span className="text-muted-foreground">
                        {formatLowerCaseName(ingredient.name)}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
