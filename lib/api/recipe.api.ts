import { CreateRecipeBody, UpdateRecipeBody } from "@/types";
import { endpoints } from "../endpoints";
import { api } from "./apiConfig";

export const getRecipes = async () => {
  const response = await api.get(endpoints.recipe);
  return response.data;
};

export const getRecipeById = async (id: string) => {
  const response = await api.get(endpoints.recipe + "/" + id);
  return response.data;
};

export const addRecipe = async (body: CreateRecipeBody) => {
  const response = await api.post(endpoints.recipe, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateRecipe = async (body: UpdateRecipeBody) => {
  const response = await api.put(`${endpoints.recipe}/${body.id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
