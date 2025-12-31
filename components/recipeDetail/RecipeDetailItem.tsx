interface RecipeDetailItemInterface {
  icon: React.ReactNode;
  data: string;
  description: string;
}
const RecipeDetailItem = ({
  icon,
  data,
  description,
}: RecipeDetailItemInterface) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-sm">{description}</p>
      <span className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-semibold">{data}</span>
      </span>
    </div>
  );
};

export default RecipeDetailItem;
