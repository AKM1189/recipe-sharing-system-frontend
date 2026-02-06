import { Recipe } from "@/types";
import RecipesGrid from "./RecipeGrid";
import NoDataFound from "../common/NoDataFound";

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
      {title && <h1 className="text-5xl font-bold mb-5">{title}</h1>}
      {description && (
        <p className="mb-14 max-w-[800px] text-center leading-8">
          {description}
        </p>
      )}
      <div className="min-w-0 w-full mt-5">
        {Array.isArray(recipes) && <RecipesGrid recipes={recipes} />}
      </div>
      <NoDataFound data={recipes} message="No Recipe Found!" />
    </div>
  );
};

export default RecipesSection;
