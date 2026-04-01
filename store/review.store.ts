import { Review } from "@/types/review";
import { create } from "zustand";

interface ReviewStoreInterface {
  editingReview: Review | null;
  replyingToReview: Review | null;
  setEditingReview: (review: Review) => void;
  setReplyingToReview: (review: Review) => void;
  removeEditingReview: () => void;
  removeReplyingToReview: () => void;
}

export const useReviewStore = create<ReviewStoreInterface>((set) => ({
  editingReview: null,
  replyingToReview: null,
  setEditingReview: (editingReview) => set({ editingReview }),
  setReplyingToReview: (replyingToReview) => set({ replyingToReview }),
  removeEditingReview: () => set({ editingReview: null }),
  removeReplyingToReview: () => set({ replyingToReview: null }),
}));
