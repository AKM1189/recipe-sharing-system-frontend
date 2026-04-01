import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../api/review.api";
import { errorToast, successToast } from "../handleToast";
import { ReviewBody } from "@/types/review";

export const useGetReviews = (recipeId: number) => {
  return useQuery({
    queryFn: () => getReviews(recipeId),
    queryKey: ["reviews", recipeId],
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, body }: { recipeId: number; body: ReviewBody }) =>
      addReview(recipeId, body),
    onSuccess: (data, variables) => {
      successToast(data);
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.recipeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.recipeId],
      });
    },
    onError: (error) => {
      errorToast(error, "Failed submitting review!");
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recipeId,
      reviewId,
      body,
    }: {
      recipeId: number;
      reviewId: number;
      body: ReviewBody;
    }) => updateReview(recipeId, reviewId, body),
    onSuccess: (data, variables) => {
      successToast(data);
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.recipeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.recipeId],
      });
    },
    onError: (error) => {
      errorToast(error, "Failed updating review!");
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recipeId,
      reviewId,
    }: {
      recipeId: number;
      reviewId: number;
    }) => deleteReview(recipeId, reviewId),
    onSuccess: (data, variables) => {
      successToast(data);
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.recipeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["recipe", variables.recipeId],
      });
    },
    onError: (error) => {
      errorToast(error, "Failed deleting review!");
    },
  });
};
