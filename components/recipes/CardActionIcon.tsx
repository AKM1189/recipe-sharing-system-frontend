import { forwardRef, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CardActionIcon = forwardRef<
  HTMLButtonElement,
  {
    icon: ReactNode;
    handleClick: () => void;
    tooltip: string;
  }
>(({ icon, handleClick, tooltip }, ref) => {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={ref}
            className="w-10 h-10 bg-white shadow-md rounded-full flex justify-center items-center"
            onClick={handleClick}
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
});

export default CardActionIcon;
