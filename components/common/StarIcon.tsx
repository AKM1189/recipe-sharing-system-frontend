import { Star } from "lucide-react";

const StarIcon = ({
  color = "orange",
  size = 20,
  fillCount = 1,
  gap = 1,
}: {
  color?: string;
  size?: number;
  fillCount?: number;
  gap?: number;
}) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        color={i < fillCount ? color : "lightgray"}
        fill={i < fillCount ? color : "lightgray"}
        size={size}
      />,
    );
  }
  return <div className={`flex gap-${gap}`}>{stars}</div>;
};

export default StarIcon;
