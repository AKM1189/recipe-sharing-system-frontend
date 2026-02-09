import RecipeDetailItem from "@/components/recipeDetail/RecipeDetailItem";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";
import { formatLowerCaseName } from "@/lib/utils";
import { Recipe, RecipeIngredients, RecipeSteps } from "@/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  ChefHat,
  Clock,
  Facebook,
  Instagram,
  Utensils,
  Youtube,
} from "lucide-react";
import ReviewList from "@/components/recipeDetail/Reviews/ReviewList";
import RatingOverview from "@/components/recipeDetail/Rating/RatingOverview";
import Image from "@/components/common/Image";
import ProfileAvatar from "@/components/common/ProfileAvatar";

type PageProps = {
  params: { id: string };
};

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params;
  const { data: recipe }: { data: Recipe } = await serverFetch(
    `${endpoints.recipe}/${id}`,
  );
  console.log("by id", recipe);
  if (recipe)
    return (
      <div className="px-20">
        <div className="mt-20">
          <div className="flex gap-20">
            {recipe?.imageUrl && (
              <Image
                className="rounded-lg h-[500px] min-w-[350px] max-w-[500px] object-cover bg-gray-200"
                publicId={recipe.imageUrl}
                alt={recipe.title}
              />
            )}
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                {recipe?.categories?.map((category) => (
                  <p
                    className="text-primary font-semibold text-sm"
                    key={category.categoryId}
                  >
                    {formatLowerCaseName(category.category.name)}
                  </p>
                ))}
              </div>
              <h1 className="text-3xl font-bold">{recipe?.title}</h1>
              <div className="flex gap-20 flex-wrap mt-5">
                <RecipeDetailItem
                  icon={
                    <Clock color="var(--color-muted-foreground)" size={18} />
                  }
                  data={`${recipe?.cookingTime} min`}
                  description="Cooking Time"
                />
                <RecipeDetailItem
                  icon={
                    <Utensils color="var(--color-muted-foreground)" size={18} />
                  }
                  data={`Serves ${recipe?.serving}`}
                  description="Serving"
                />
                <RecipeDetailItem
                  icon={
                    <ChefHat color="var(--color-muted-foreground)" size={18} />
                  }
                  data={`${recipe.difficulty}`}
                  description="Difficulty Level"
                />
              </div>

              {/* author */}

              <div className="flex items-center gap-5 mt-10 pb-10 border-b">
                <ProfileAvatar profileUrl={recipe.user.profileUrl} size={16} />
                <div>
                  <h2 className="text-lg font-semibold">
                    {formatLowerCaseName(recipe.user.name)}
                  </h2>
                  <p className="text-sm text-muted-foreground">Recipe Author</p>
                </div>
              </div>

              <div>
                <p className="mt-4">{recipe.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-20">
          <h1 className="text-xl font-semibold">Ingredients</h1>
          <div className="flex flex-col flex-wrap max-h-80 gap-5 mt-8">
            {recipe.ingredients.map((ingredient: RecipeIngredients) => (
              <div key={ingredient.id}>
                <div className="flex">
                  <Label className="flex items-center gap-3 rounded-lg has-aria-checked:line-through">
                    <Checkbox
                      id="toggle-2"
                      className="data-[state=checked]:border-primary border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                    />
                    <span className="font-medium text-base">
                      {ingredient.quantity} {ingredient.unit}{" "}
                      {formatLowerCaseName(ingredient.name)}
                    </span>
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Directions */}
        <div className="mt-20 max-w-[900px]">
          <h1 className="text-xl font-semibold">Directions</h1>
          <div className="flex flex-col gap-10 mt-8">
            {recipe.steps.map((step: RecipeSteps) => (
              <div key={step.id}>
                <div className="flex gap-3">
                  <div className="">
                    <div className="p-2 bg-primary shadow-md rounded-full w-7 h-7 flex justify-center items-center text-white font-bold">
                      {step.stepNumber}
                    </div>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">{step.title} -</span>{" "}
                      {step.instruction}
                    </p>
                    <div className="mt-5 min-w-[300px] h-auto object-cover">
                      {step.imageUrl && (
                        <Image
                          className="rounded-lg min-h-[200px] max-h-[300px]"
                          publicId={step.imageUrl}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author */}
        <div className="flex gap-8 mt-16 pt-16 border-t max-w-[900px]">
          <ProfileAvatar profileUrl={recipe.user.profileUrl} size={24} />

          <div>
            <p className="text-sm text-muted-foreground mb-2">Written By</p>

            <h2 className="text-lg font-semibold mb-3">
              {formatLowerCaseName(recipe.user.name)}
            </h2>
            <p>
              Chloe Sanders is a dedicated recipe editor who loves crafting and
              refining dishes that excite home cooks. Her keen attention to
              detail and passion for global flavors ensure each recipe is
              approachable, flavorful, and easy to follow. When she's not
              working, Chloe enjoys exploring new cuisines and cooking
              techniques.
            </p>
            <div className="flex gap-3 mt-5">
              <Facebook
                size={30}
                className="rounded-full p-1 border-2 border-primary cursor-pointer"
                color="var(--color-primary)"
              />
              <Instagram
                size={30}
                className="rounded-full p-1 border-2 border-primary cursor-pointer"
                color="var(--color-primary)"
              />
              <Youtube
                size={30}
                className="rounded-full p-1 border-2 border-primary cursor-pointer"
                color="var(--color-primary)"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-20 max-w-[900px]">
          <RatingOverview recipeId={recipe.id} />
        </div>

        {/* Reviews */}
        <div className=" max-w-[900px]">
          <ReviewList recipe={recipe} />
        </div>
      </div>
    );
}
