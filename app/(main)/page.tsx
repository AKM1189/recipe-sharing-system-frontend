import RecipeCard from "@/components/recipes/RecipeCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { dummyRecipes } from "@/data";
import { constants } from "@/lib/constants";
import { useMe } from "@/lib/queries/auth.queries";
import { Search, Utensils } from "lucide-react";

export default function Home() {
  const categories = [
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

  return (
    <div className="mx-20">
      <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-5xl font-bold">{constants.title}</h1>
          <p className="leading-6 mt-3">
            Explore and share daily cooking ideas with our recipes. Discover
            dishes, videos, tips, and inspiration tailored to your tastes and
            the community you connect with.
          </p>
        </div>

        <div className="relative w-[600px] mt-16 flex items-center">
          <div className="absolute left-5">
            <Utensils color="var(--color-primary)" />
          </div>
          <Input
            placeholder="Find recipes to cook today"
            className="ps-16 bg-white! focus:outline-0! focus:ring-0! h-14 text-[16px]! shadow-md rounded-full"
          />
          <div className="absolute right-2 w-10 h-10 rounded-full bg-primary flex justify-center items-center">
            <Search color="#ffffff" className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-2 gap-y-4 max-w-[1000px]">
          {categories.map((category, index) => (
            <a href={`/recipes/categories/${category}`} key={index}>
              <Badge className="text-sm px-4 py-2.5">{category}</Badge>
            </a>
          ))}
        </div>
      </div>

      {/* recipes list */}
      <div className="relative mt-20 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-5">New Recipes</h1>
        <p className="mb-14">
          Explore our latest recipes, from quick snacks to hearty meals and
          indulgent desserts.
        </p>
        <RecipeCard recipes={dummyRecipes} />
      </div>
    </div>
  );
}
