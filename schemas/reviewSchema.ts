import z from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  review: z.string().min(1, "Review is required"),
});

export const replySchema = z.object({
  review: z.string().min(1, "Review is required"),
});
