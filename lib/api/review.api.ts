import { ReviewBody } from "@/types/review";
import { endpoints } from "../endpoints";
import { api } from "./apiConfig";

export const getReviews = async (recipeId: number) => {
  const response = await api.get(`${endpoints.recipe}/${recipeId}/reviews`);
  return response.data;
};

export const addReview = async (recipeId: number, body: ReviewBody) => {
  const response = await api.post(
    `${endpoints.recipe}/${recipeId}/reviews`,
    body,
  );
  return response.data;
};

export const updateReview = async (
  recipeId: number,
  reviewId: number,
  body: ReviewBody,
) => {
  const response = await api.put(
    `${endpoints.recipe}/${recipeId}/reviews/${reviewId}`,
    body,
  );
  return response.data;
};

export const deleteReview = async (recipeId: number, reviewId: number) => {
  const response = await api.delete(
    `${endpoints.recipe}/${recipeId}/reviews/${reviewId}`,
  );
  return response.data;
};
