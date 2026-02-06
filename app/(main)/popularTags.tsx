import Categories from "@/components/categories/Categories";
import NoDataFound from "@/components/common/NoDataFound";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { serverFetch } from "@/lib/api/server-api";
import { constants } from "@/lib/constants";
import { endpoints } from "@/lib/endpoints";
import { Category } from "@/types";
import { Search, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function PopularTags() {
  const tags = [
    "APPETIZERS",
    "DRINKS",
    "DESSERTS",
    "SNACKS",
    "BREADS",
    "BREAKFASTS",
    "HEALTHY",
    "MEAT",
    "APPETIZERS",
    "DRINKS",
    "DESSERTS",
    "SNACKS",
    "BREADS",
    "BREAKFASTS",
    "HEALTHY",
    "MEAT",
  ];
  const categories: { data: Category[]; error: string | undefined } =
    await serverFetch(endpoints.category);
  return (
    <div className="mt-28">
      <div className="min-h-[100px] py-20 px-5 bg-secondary flex flex-col justify-center items-center">
        <div className="text-center max-w-[1000px] mx-auto">
          <h1 className="text-5xl font-bold">Explore Popular Tags</h1>
          <p className="leading-6 mt-3 text-muted-foreground">
            From quick meals to healthy dishes, our popular tags make it easy to
            explore delicious options with one click.
          </p>
        </div>
        <Categories categories={categories} isFooter={true} />
        <NoDataFound data={categories.data} message="No Tags Found!" />
      </div>
    </div>
  );
}
