import { RecipeForm } from "@/components/addRecipe/RecipeForm";

export default function CreateRecipe() {
  return (
    <div>
      <div className="text-center max-w-[800px] mx-auto mb-10">
        <h1 className="text-4xl font-bold"> Add Recipe</h1>
        <p className="leading-6 mt-5 text-sm">
          Discover and share your favorite recipes on Platea! Add your own
          delicious dishes and inspire others with new culinary creations.
        </p>
      </div>
      <div className="max-w-[800px] mx-auto">
        <RecipeForm />
      </div>
    </div>
  );
}
