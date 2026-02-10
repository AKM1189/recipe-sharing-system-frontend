import { Recipe } from "@/types";
import { ForwardedRef, forwardRef } from "react";
import { formatLowerCaseName } from "@/lib/utils";
import RecipeDetailItem from "./RecipeDetailItem";
import { ChefHat, Clock, Utensils } from "lucide-react";
import Image from "next/image";

const PrintRecipe = ({
  recipe,
  ref,
}: {
  recipe: Recipe;
  ref: ForwardedRef<HTMLDivElement>;
}) => {
  return (
    <div ref={ref} className="p-10">
      <div className="w-full flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <Image
            alt="Recipixa"
            width={40}
            height={40}
            src={"/recipe_logo.png"}
          />
          <h2 className="text-2xl text-primary font-extrabold">Recipixa</h2>
        </div>
      </div>
      <div className="flex flex-col gap-2 min-w-[300px] w-full">
        <h1 className="text-3xl font-bold">{recipe?.title}</h1>
        <div className="flex">
          {recipe?.categories?.map((category, index) => (
            <p
              className="text-primary font-semibold text-sm whitespace-break-spaces"
              key={category.categoryId}
            >
              {formatLowerCaseName(category.category.name)}
              {index !== recipe?.categories?.length - 1 && ", "}
            </p>
          ))}
        </div>
        <div className="flex gap-20 flex-wrap mt-4">
          <RecipeDetailItem
            icon={<Clock color="var(--color-muted-foreground)" size={24} />}
            data={`${recipe?.cookingTime} min`}
            description="Cooking Time"
          />
          <RecipeDetailItem
            icon={<Utensils color="var(--color-muted-foreground)" size={24} />}
            data={`Serves ${recipe?.serving}`}
            description="Serving"
          />
          <RecipeDetailItem
            icon={<ChefHat color="var(--color-muted-foreground)" size={24} />}
            data={`${recipe.difficulty}`}
            description="Difficulty Level"
          />
        </div>

        {/* ingredients */}
        <div className="mt-8">
          <h1 className="text-xl font-bold mb-3">Ingredients</h1>
          <ul className="ms-4">
            {recipe.ingredients.map((item) => (
              <li key={item.id} className="list-disc mb-1.5">
                {item.quantity} {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* directions */}
        <div className="mt-5">
          <h1 className="text-xl font-bold mb-3">Directions</h1>
          <div>
            {recipe.steps.map((item) => (
              <div key={item.id} className="mb-1.5">
                {item.stepNumber}. {item.instruction}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintRecipe;
