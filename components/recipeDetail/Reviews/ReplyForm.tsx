"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Controller, useForm } from "react-hook-form";
import { replySchema, reviewSchema } from "@/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Textarea } from "../../ui/textarea";
import { useAddReview, useUpdateReview } from "@/lib/queries/review.queries";
import { Review } from "@/types/review";
import { useReviewStore } from "@/store/review.store";

const ReplyForm = ({
  recipeId,
  review,
  parentReview,
}: {
  recipeId: number;
  review?: Review;
  parentReview?: Review;
}) => {
  const { mutate: addReview } = useAddReview();
  const { mutate: updateReview } = useUpdateReview();
  const { editingReview, removeEditingReview, removeReplyingToReview } =
    useReviewStore();

  const defaultValues = review
    ? {
        parentId: undefined,
        review: review.description,
      }
    : {
        parentId: undefined,
        review: "",
      };

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof replySchema>) => {
    if (!parentReview) return;

    if (editingReview) {
      const payload = {
        ...values,
        parentId: editingReview?.parentId ?? 0,
      };
      updateReview(
        {
          recipeId,
          reviewId: editingReview.id,
          body: payload,
        },
        {
          onSuccess: () => {
            removeEditingReview();
            form.reset();
          },
        },
      );
    } else {
      const payload = {
        ...values,
        parentId: parentReview.id,
      };
      addReview(
        {
          recipeId,
          body: payload,
        },
        {
          onSuccess: () => {
            removeReplyingToReview();
            form.reset();
          },
        },
      );
    }
  };

  const renderFormHeader = () => {
    if (editingReview) {
      return (
        <div>
          <h1 className="text-xl font-semibold mb-8">Edit Your Reply</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-xl font-semibold mb-3">
            Replying To {parentReview?.user.name}
          </h1>
        </div>
      );
    }
  };

  return (
    <div className="max-w-[700px] bg-slate p-8 rounded-md">
      {renderFormHeader()}
      <form
        id="form-rhf-review"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FieldGroup>
          <Controller
            name="review"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Message</FieldLabel>
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
            onClick={() => console.log(form.formState.errors)}
            className="w-[100px] mt-4 px-3 py-2 bg-primary text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
