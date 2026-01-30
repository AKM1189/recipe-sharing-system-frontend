import { Category } from "@/types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Categories {
  data: Category[];
}

const Categories = ({
  categories,
  isFooter = false,
}: {
  categories: Categories;
  isFooter?: boolean;
}) => {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-x-2 gap-y-4 max-w-[1000px]">
      {Array.isArray(categories?.data) &&
        categories?.data.map((category, index) => (
          <Link href={`/recipes/categories/${category.name}`} key={index}>
            <Badge
              className={twMerge(
                "text-sm px-4 py-2.5",
                isFooter &&
                  "hover:bg-primary border-primary text-primary hover:text-white transition-all duration-200",
              )}
              variant={isFooter ? "outline" : "default"}
            >
              {category.name.toUpperCase()}
            </Badge>
          </Link>
        ))}
    </div>
  );
};

export default Categories;
