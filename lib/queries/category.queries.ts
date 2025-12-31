import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/category.api";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
