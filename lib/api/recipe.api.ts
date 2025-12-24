import { RecipeBody } from "@/types";
import { endpoints } from "../endpoints";
import { api } from "./apiConfig";

export const getRecipes = async () => {
  const response = await api.get(endpoints.recipe);
  return response.data;
};

export const addRecipe = async (body: RecipeBody) => {
  const response = await api.post(endpoints.recipe, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
