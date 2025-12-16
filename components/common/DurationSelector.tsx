import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DurationSelectorInterface {
  open: boolean;
  onOpenChange: () => void;
  value: number;
  data: number[];
  onValueChange: (key: string, value: number) => void;
  type: "hour" | "minute";
}

export function DurationSelector({
  open,
  onOpenChange,
  value,
  data,
  onValueChange,
  type,
}: DurationSelectorInterface) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger className="border border-input py-2 ps-4 pe-2 w-[20 rounded-md flex items-center gap-4">
        {value}{" "}
        <div
          className={cn(" transition-all duration-300", open && "-rotate-180")}
        >
          <ChevronDown color="var(--color-border)" />
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-[60px] left-0 p-0">
        <div className="flex flex-col max-h-[200px] overflow-scroll">
          {data.map((hour) => (
            <Button
              key={hour}
              variant="ghost"
              onClick={() => {
                onValueChange(type, hour);
                onOpenChange();
              }}
            >
              {hour}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
