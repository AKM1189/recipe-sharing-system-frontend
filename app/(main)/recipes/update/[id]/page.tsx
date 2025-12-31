import { RecipeForm } from "@/components/addRecipe/RecipeForm";
import { serverFetch } from "@/lib/api/server-api";
import { endpoints } from "@/lib/endpoints";

export default async function UpdateRecipe({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: recipe } = await serverFetch(`${endpoints.recipe}/${id}`);
  console.log("recipe", recipe);

  return (
    <div>
      <div className="text-center max-w-[800px] mx-auto mb-10">
        <h1 className="text-4xl font-bold"> Update Recipe {id}</h1>
        <p className="leading-6 mt-5 text-sm">
          Discover and share your favorite recipes on Platea! Add your own
          delicious dishes and inspire others with new culinary creations.
        </p>
      </div>
      <div className="max-w-[800px] mx-auto">
        <RecipeForm recipe={recipe} />
      </div>
    </div>
  );
}
