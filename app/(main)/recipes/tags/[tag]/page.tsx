export default async function RecipesByTag({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return <div>Recipes for {tag} Tag</div>;
}
