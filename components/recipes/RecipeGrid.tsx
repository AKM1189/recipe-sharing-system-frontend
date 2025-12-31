import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

const RecipesGrid = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <div
      // className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
      className="flex flex-wrap gap-6"
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesGrid;
