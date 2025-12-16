export default async function RecipesByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <div>Recipes for {category} Category</div>;
}
