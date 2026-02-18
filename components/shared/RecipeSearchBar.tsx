import { Input } from "@/components/ui/input";
import { Search, Utensils } from "lucide-react";
import Form from "next/form";

const RecipeSearchBar = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="text-center max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="leading-6 mt-3">{description}</p>
      </div>

      <Form action="/recipes" className="w-full flex justify-center">
        <div className="relative w-full md:w-[600px] mt-16 flex items-center">
          <div className="absolute left-5">
            <Utensils color="var(--color-primary)" />
          </div>
          <Input
            name="query"
            placeholder="Find recipes to cook today"
            className="w-full ps-16 bg-white! focus:outline-0! focus:ring-0! h-14 text-[16px]! shadow-md rounded-full"
          />
          <button
            type="submit"
            className="absolute right-2 w-10 h-10 rounded-full bg-primary flex justify-center items-center"
          >
            <Search color="#ffffff" className="w-6 h-6" />
          </button>
        </div>
      </Form>
    </>
  );
};

export default RecipeSearchBar;
