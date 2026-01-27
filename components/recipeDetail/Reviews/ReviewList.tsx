"use client";
import { Review } from "@/types/review";
import ReviewItem from "./ReviewItem";
import { useGetReviews } from "@/lib/queries/review.queries";
import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useAuthStore } from "@/store/auth.store";
import { useReviewStore } from "@/store/review.store";
import { Recipe } from "@/types";

const ReviewList = ({ recipe }: { recipe: Recipe }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { data } = useGetReviews(recipe.id);
  const { user } = useAuthStore();
  const { editingReview } = useReviewStore();

  useEffect(() => {
    if (data?.data) {
      setReviews(data?.data);
    }
  }, [data]);

  const isAuthor = recipe.userId === user?.id;

  const isUserWroteReview = reviews.find(
    (review) =>
      !review.parentId && review?.user?.id == user?.id && !review.deleted,
  );

  const reviewsLength = reviews.filter((review) => review.rating).length;

  return (
    <div>
      {!isUserWroteReview && !isAuthor && (
        <div className="mt-20">
          <ReviewForm recipeId={recipe.id} />
        </div>
      )}

      <h1 className="text-xl font-semibold mt-20 mb-3">
        Reviews ({reviewsLength ?? 0})
      </h1>
      <div className="flex flex-col gap-3">
        <div className="space-y-5">
          {reviews.map((review) => {
            return editingReview?.id === review.id ? (
              <ReviewForm
                key={review.id}
                recipeId={recipe.id}
                review={review}
              />
            ) : (
              review.rating && <ReviewItem key={review.id} review={review} />
            );
          })}
        </div>
        {reviews.length == 0 && (
          <div className="text-sm  text-muted-foreground">No reviews yet</div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
