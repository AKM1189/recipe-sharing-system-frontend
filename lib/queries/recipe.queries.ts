import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addRecipe,
  addToFavourite,
  getFavouriteByUser,
  getFavouriteRecipesByUser,
  getRecipeById,
  getRecipes,
  getRecipesByUser,
  removeFromFavourite,
  updateRecipe,
} from "../api/recipe.api";
import { errorToast, successToast } from "../handleToast";

export const useAddRecipe = () => {
  return useMutation({
    mutationFn: addRecipe,
    onSuccess: (data) => {
      successToast(data);
    },
    onError: (err) => {
      errorToast(err, "Recipe creating failed");
    },
  });
};

export const useGetRecipeById = (id: number) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
  });
};

export const useUpdateRecipe = () => {
  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      successToast(data);
    },
    onError: (err) => {
      errorToast(err, "Recipe updating failed");
    },
  });
};

export const useGetRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useGetFavourites = () => {
  return useQuery({
    queryKey: ["favourites"],
    queryFn: getFavouriteByUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useGetFavouriteRecipes = () => {
  return useQuery({
    queryKey: ["favourites", "recipes"],
    queryFn: getFavouriteRecipesByUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useAddToFavourite = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ recipeId }: { recipeId: number }) =>
      addToFavourite(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};

export const useRemoveFromFavourite = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ recipeId }: { recipeId: number }) =>
      removeFromFavourite(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};

export const useGetRecipesByUser = () => {
  return useQuery({
    queryKey: ["recipes", "user"],
    queryFn: getRecipesByUser,
  });
};
