import StarIcon from "@/components/common/StarIcon";
import { Progress } from "@/components/ui/progress";
import { Review } from "@/types/review";

const RatingProgressList = ({ reviews }: { reviews: Review[] }) => {
  const getRatingCounts = (reviews: Review[]) => {
    return reviews.reduce(
      (acc, review) => {
        if (review.rating === null) return acc;
        acc[review.rating] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
    );
  };

  const parentReviews = reviews.filter((review) => review.rating !== null);
  const ratingCounts = getRatingCounts(parentReviews);
  const totalReviews = parentReviews.length;

  return (
    <div className="flex flex-col gap-3 w-[500px]">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratingCounts[star];
        const percentage =
          totalReviews === 0 ? 0 : (count / totalReviews) * 100;
        return (
          <div key={star}>
            <RatingProgress star={star} percentage={percentage} />
          </div>
        );
      })}
    </div>
  );
};

export default RatingProgressList;

const RatingProgress = ({
  star,
  percentage,
}: {
  star: number;
  percentage: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      <StarIcon fillCount={star} />
      <Progress className="w-[300px]" value={percentage} max={100} />
      <div className="text-sm text-muted-foreground flex justify-start w-10">
        <span>{percentage.toFixed(0)}</span>{" "}
        <span>{percentage > 0 && "%"}</span>
      </div>
    </div>
  );
};
