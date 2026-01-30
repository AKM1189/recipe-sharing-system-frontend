"use client";

import { useEffect, useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Controller, useForm } from "react-hook-form";
import { reviewSchema } from "@/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import RatingIcon from "../Rating/RatingIcon";
import { Textarea } from "../../ui/textarea";
import { useAddReview, useUpdateReview } from "@/lib/queries/review.queries";
import { Review } from "@/types/review";
import { useReviewStore } from "@/store/review.store";
import { useAuthStore } from "@/store/auth.store";
import { useConfirmStore } from "@/store/confirm.store";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

const ReviewForm = ({
  recipeId,
  review,
}: {
  recipeId: number;
  review?: Review;
}) => {
  const { mutate: addReview } = useAddReview();
  const { mutate: updateReview } = useUpdateReview();
  const [fillCount, setFillCount] = useState(0);
  const { editingReview, removeEditingReview, removeReplyingToReview } =
    useReviewStore();
  const { user } = useAuthStore();
  const { showConfirm, removeConfirm } = useConfirmStore();
  const router = useRouter();

  const defaultValues = review
    ? {
        rating: review.rating ?? 0,
        review: review.description,
      }
    : {
        rating: 0,
        review: "",
      };

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues,
  });

  useEffect(() => {
    if (review) setFillCount(review.rating ?? 0);
  }, [review]);

  const onSubmit = (values: z.infer<typeof reviewSchema>) => {
    if (!user) {
      showConfirm({
        show: true,
        title: "Please Log In first!",
        body: "You need to log in to write a review. Go to Login page?",
        onConfirm: () => router.push(routes.auth.login),
      });
      return;
    }
    if (editingReview) {
      updateReview(
        {
          recipeId,
          reviewId: editingReview.id,
          body: values,
        },
        {
          onSuccess: () => {
            form.reset();
            removeEditingReview();
          },
        },
      );
    } else {
      addReview(
        {
          recipeId,
          body: values,
        },
        {
          onSuccess: () => {
            form.reset();
          },
        },
      );
    }
  };

  useEffect(() => {
    form.setValue("rating", fillCount);
  }, [fillCount]);

  const renderFormHeader = () => {
    if (editingReview) {
      return (
        <div>
          <h1 className="text-xl font-semibold mb-8">Edit Your Review</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-xl font-semibold mb-3">Write a Review</h1>
          <p className="mb-8 text-sm font-medium text-muted-foreground">
            Cooked this? Rate this recipe!
          </p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-[700px] bg-slate-50 p-8 rounded-md">
      {renderFormHeader()}
      <form
        id="form-rhf-review"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FieldGroup>
          <Controller
            name="rating"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Rating</FieldLabel>

                <RatingIcon fillCount={fillCount} setFillCount={setFillCount} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="review"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Review</FieldLabel>
                <Textarea
                  rows={5}
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter review"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end gap-5 mt-3">
          <button
            className="w-[100px] mt-4 px-3 py-2 bg-gray-200 text-secondary-foreground rounded"
            onClick={(e) => {
              e.preventDefault();
              removeEditingReview();
              removeReplyingToReview();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[100px] mt-4 px-3 py-2 bg-primary text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
