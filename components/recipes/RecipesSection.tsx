"use client";
import { Recipe } from "@/types";
import RecipesGrid from "./RecipeGrid";
import NoDataFound from "../common/NoDataFound";
import { usePaginationStore } from "@/store/pagination.store";
import { useGetRecipes } from "@/lib/queries/recipe.queries";
import { useEffect, useState } from "react";
import CustomPagination from "../common/CustomPagination";
import { Spinner } from "../ui/spinner";

const RecipesSection = ({
  title,
  description,
  searchQuery = "",
}: {
  title: string;
  description: string;
  searchQuery?: string;
}) => {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);

  const { pagination, setPagination } = usePaginationStore();
  const { data, refetch, isFetching } = useGetRecipes(searchQuery, {
    page: pagination.current,
    limit: 9,
  });

  useEffect(() => {
    if (data && data.success) {
      const { page, limit, totalPages } = data?.data?.meta;
      setRecipesData(data?.data?.items);
      setPagination({
        current: page,
        limit: limit,
        total: totalPages,
      });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pagination.current, searchQuery]);

  // if (!data || data?.success) {
  //   return <NoDataFound data={data.data} message="Recipe fetching error!" />;
  // }
  return (
    <div className="relative mt-20 flex flex-col items-center">
      {title && <h1 className="text-5xl font-bold mb-5">{title}</h1>}
      {description && (
        <p className="mb-14 max-w-[800px] text-center leading-8">
          {description}
        </p>
      )}
      <div className="relative min-w-0 w-full mt-5">
        {isFetching && (
          <div className="z-100 absolute top-0 left-0 bg-white/50  w-full h-full flex justify-center items-center">
            <Spinner className="size-12" />
          </div>
        )}
        {Array.isArray(recipesData) && <RecipesGrid recipes={recipesData} />}
      </div>
      {recipesData && <CustomPagination />}
    </div>
  );
};

export default RecipesSection;
