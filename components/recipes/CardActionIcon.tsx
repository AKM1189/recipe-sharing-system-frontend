import { ReactNode } from "react";

const CardActionIcon = ({
  icon,
  handleClick,
}: {
  icon: ReactNode;
  handleClick: () => void;
}) => {
  return (
    <div>
      <span
        className="w-10 h-10 bg-white shadow-md rounded-full flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {icon}
      </span>
    </div>
  );
};

export default CardActionIcon;
