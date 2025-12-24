import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { constants } from "@/lib/constants";
import { Search, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PopularTags() {
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

        <div className="mt-16 flex flex-wrap justify-center gap-x-2 gap-y-4 max-w-[1000px]">
          {tags.map((tag, index) => (
            <a href={`/recipes/tags/${tag}`} key={index}>
              <Badge
                className="text-sm px-4 py-2.5 hover:bg-primary hover:text-white transition-all duration-200"
                variant={"outline"}
              >
                {tag}
              </Badge>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
