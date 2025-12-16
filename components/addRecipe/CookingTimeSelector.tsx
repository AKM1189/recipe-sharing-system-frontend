import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { recipeSchema } from "@/schemas/recipeSchema";

interface DurationSelectorInterface {
  open: boolean;
  onOpenChange: () => void;
  value: number;
  data: number[];
  onValueChange: (key: string, value: number) => void;
  type: "hour" | "minute";
}

const hours = Array.from({ length: 25 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

const CookingTimeSelector = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof recipeSchema>>;
}) => {
  const [cookingTime, setCookingTime] = useState({
    hourOpen: false,
    minuteOpen: false,
    hour: 0,
    minute: 0,
  });

  const updateCookingTime = (key: string, value: number | boolean) => {
    setCookingTime((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FieldGroup>
      <Controller
        name="cookingTime"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-10 mt-4">
              <FieldLabel>Cooking Time</FieldLabel>
              <div className="flex gap-2 items-center">
                <DurationSelector
                  open={cookingTime.hourOpen}
                  onOpenChange={() =>
                    updateCookingTime("hourOpen", !cookingTime.hourOpen)
                  }
                  value={cookingTime.hour}
                  data={hours}
                  onValueChange={(type, hour) => {
                    updateCookingTime(type, hour);
                    field.onChange(hour * 60 + cookingTime.minute);
                  }}
                  type="hour"
                />
                <label className=" text-sm font-medium">Hour</label>
              </div>

              <div className="flex gap-2 items-center">
                <DurationSelector
                  open={cookingTime.minuteOpen}
                  onOpenChange={() =>
                    updateCookingTime("minuteOpen", !cookingTime.minuteOpen)
                  }
                  value={cookingTime.minute}
                  data={minutes}
                  onValueChange={(type, minute) => {
                    updateCookingTime(type, minute);
                    field.onChange(cookingTime.hour * 60 + minute);
                  }}
                  type="minute"
                />
                <label className="mb-1 text-sm font-medium">Minute</label>
              </div>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default CookingTimeSelector;

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
