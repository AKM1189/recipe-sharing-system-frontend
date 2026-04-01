import StarIcon from "@/components/common/StarIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteReview } from "@/lib/queries/review.queries";
import { useAuthStore } from "@/store/auth.store";
import { useReviewStore } from "@/store/review.store";
import { Review } from "@/types/review";
import { Edit, EllipsisVertical, Trash, Trash2 } from "lucide-react";
import ReplyForm from "./ReplyForm";

const ReviewItem = ({
  review,
  depth = 0,
}: {
  review: Review;
  depth?: number;
}) => {
  const { editingReview } = useReviewStore();
  return (
    <div>
      <div>
        {review.deleted && review.replies.length > 0 ? (
          <div className="border-b p-5 bg-slate rounded-lg flex gap-3 text-muted-foreground">
            <Trash2 size={20} color="var(--color-muted-foreground)" /> This
            review has been deleted
          </div>
        ) : editingReview && editingReview.id === review.id ? (
          <div className="mt-2">
            <ReplyForm recipeId={review.recipeId} review={review} />
          </div>
        ) : (
          <ReviewCard review={review} depth={depth} />
        )}
      </div>
      {review.replies?.length > 0 && (
        <div className="mt-2 ms-10 space-y-2 border-l border-border">
          {review.replies.map((reply) => {
            if (!reply.deleted) {
              return (
                <div className="flex gap-2" key={reply.id}>
                  <span className="w-20 h-px relative top-14 border bg-border" />
                  <div className="flex-1">
                    <ReviewItem review={reply} depth={depth + 1} />
                  </div>
                </div>
              );
            } else if (reply.deleted && reply.replies.length > 0) {
              return <div>Reply deleted</div>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;

const ReviewCard = ({
  review,
  depth = 0,
}: {
  review: Review;
  depth?: number;
}) => {
  const { user } = useAuthStore();
  const { replyingToReview, setEditingReview, setReplyingToReview } =
    useReviewStore();
  const { mutate: deleteReview } = useDeleteReview();

  const createdAt = new Date(review.createdAt).toLocaleString();

  const isAuthor = review.userId === user?.id;
  const isReplyingReview =
    replyingToReview && replyingToReview?.id === review.id;

  const handleDelete = (reviewId: number, recipeId: number) => {
    deleteReview({ recipeId, reviewId });
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
  };

  return (
    <div>
      <div className="relative flex gap-5 border-b p-5 bg-slate rounded-lg">
        <div className="min-w-12 min-h-12">
          <img
            className="w-12 h-12 rounded-full"
            src="https://github.com/shadcn.png"
          />
        </div>

        <div className="w-full">
          <div className="flex">
            <div className="mb-3">
              <p className="font-semibold text-lg">
                {review.user.name.toUpperCase()}{" "}
                {isAuthor && (
                  <span className="text-muted-foreground">(You)</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {/* July 30, 2025 at 3:12 am */}
                {createdAt}
              </p>
            </div>
            {review.rating && (
              <div className="mt-1">
                <StarIcon fillCount={review.rating} />
              </div>
            )}
            {isAuthor && (
              <div className="absolute top-6 right-5">
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical
                      className="cursor-pointer"
                      color="var(--color-muted-foreground)"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[150px] absolute -right-3 m-0 p-1">
                    <div className="flex flex-col justify-start gap-1">
                      <div
                        className="text-sm flex gap-2 cursor-pointer hover:bg-accent px-3 py-2"
                        onClick={() => handleEdit(review)}
                      >
                        <Edit size={16} />
                        Edit
                      </div>
                      <div
                        className="text-sm flex gap-2 cursor-pointer hover:bg-accent px-3 py-2 text-destructive"
                        onClick={() => handleDelete(review.id, review.recipeId)}
                      >
                        <Trash size={16} color="red" />
                        Delete
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
          <p>{review.description}</p>
          {!isAuthor && !isReplyingReview && depth < 2 && (
            <p
              className="mt-3 text-primary cursor-pointer"
              onClick={() => setReplyingToReview(review)}
            >
              Reply
            </p>
          )}
        </div>
      </div>
      {replyingToReview && replyingToReview.id === review.id && (
        <div className="mt-2 ms-10 ps-20">
          <ReplyForm recipeId={review.recipeId} parentReview={review} />
        </div>
      )}
    </div>
  );
};
