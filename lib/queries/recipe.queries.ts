import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { addRecipe, getRecipes, updateRecipe } from "../api/recipe.api";
import { successToast } from "../handleToast";

export const useAddRecipe = () => {
  return useMutation({
    mutationFn: addRecipe,
    onSuccess: (data) => {
      successToast(data);
    },
  });
};

export const useUpdateRecipe = () => {
  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      successToast(data);
    },
  });
};

export const useGetRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};
