import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CardActionIcon = ({
  icon,
  handleClick,
  tooltip,
}: {
  icon: ReactNode;
  handleClick: () => void;
  tooltip: string;
}) => {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="w-10 h-10 bg-white shadow-md rounded-full flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {icon}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CardActionIcon;
