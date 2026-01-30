import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addRecipe,
  addToFavourite,
  deleteRecipe,
  getFavouriteByUser,
  getFavouriteRecipesByUser,
  getRecipeById,
  getRecipes,
  getRecipesByUser,
  removeFromFavourite,
  searchRecipes,
  updateRecipe,
} from "../api/recipe.api";
import { errorToast, successToast } from "../handleToast";

export const useGetRecipes = (query: string) => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(query),
  });
};

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

export const useDeleteRecipe = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ recipeId }: { recipeId: number }) => deleteRecipe(recipeId),
    onSuccess: () => {
      successToast("Recipe delete successfully!");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      errorToast(error, "Failed to delete recipe!");
    },
  });
};

export const useGetRecipesByUser = () => {
  return useQuery({
    queryKey: ["recipes", "user"],
    queryFn: getRecipesByUser,
  });
};

export const useSearchRecipe = (search: string) => {
  return useQuery({
    queryKey: ["recipes", search],
    queryFn: () => searchRecipes(search),
  });
};
