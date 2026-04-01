"use client";

import { Star } from "lucide-react";
import { useState } from "react";

const RatingIcon = ({
  color = "orange",
  size = 30,
  gap = 1,
  fillCount,
  setFillCount,
}: {
  color?: string;
  size?: number;
  gap?: number;
  fillCount: number;
  setFillCount: (count: number) => void;
}) => {
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <div className={`flex gap-${gap}`}>
      {[...Array(5)].map((_, i) => {
        const active = hoverCount ? i < hoverCount : i < fillCount;

        return (
          <Star
            key={i}
            color={active ? color : "lightgray"}
            fill={active ? color : "lightgray"}
            size={size}
            onMouseEnter={() => setHoverCount(i + 1)}
            onMouseLeave={() => setHoverCount(0)}
            className="cursor-pointer transition-colors duration-300"
            onClick={() => setFillCount(i + 1)}
          />
        );
      })}
    </div>
  );
};

export default RatingIcon;
