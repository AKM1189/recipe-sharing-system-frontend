import { Recipe } from "@/types";
import RecipesGrid from "./RecipeGrid";

const RecipesSection = ({
  title,
  description,
  recipes,
}: {
  title: string;
  description: string;
  recipes: Recipe[];
}) => {
  return (
    <div className="relative mt-20 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-5">{title}</h1>
      <p className="mb-14 max-w-[800px] text-center leading-8">{description}</p>
      <div className="min-w-0 w-full mt-10">
        {Array.isArray(recipes) && <RecipesGrid recipes={recipes} />}
      </div>
    </div>
  );
};

export default RecipesSection;
