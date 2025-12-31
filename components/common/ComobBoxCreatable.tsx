"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface MultiSelectCreatableProps {
  value: string[];
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  data: string[];
  onAddCategory: (newCategory: string) => void;
  onRemoveCategory: (category: string) => void;
}

export const MultiSelectCreatable: React.FC<MultiSelectCreatableProps> = ({
  value,
  onValueChange,
  placeholder,
  data,
  onAddCategory,
  onRemoveCategory,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    const newValue = inputValue.trim();
    if (!value.includes(newValue)) {
      onValueChange([...value, newValue]);
      onAddCategory?.(newValue);
      setInputValue("");
    }
  };

  const handleSelect = (item: string) => {
    if (!value.includes(item)) {
      onValueChange([...value, item]);
    }
  };

  const handleRemove = (item: string) => {
    onValueChange(value.filter((v) => v !== item));
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger className="border border-input w-full text-left flex items-center h-10 ps-3 rounded-md text-neutral-500 text-sm">
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {value.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded"
                >
                  <span>{item}</span>
                  <span
                    className="text-text hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item);
                    }}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div>{placeholder}</div>
          )}
        </PopoverTrigger>
        <PopoverContent className="p-2 w-full">
          <div className="flex flex-col">
            {data.map((item) => (
              <Button
                variant={"outline"}
                key={item}
                className="w-full justify-between !items-left border-none"
                value={item}
                onClick={() => handleSelect(item)}
              >
                {item}

                <span
                  className="cursor-pointer hover:bg-gray-200 p-1 rounded-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCategory(item);
                  }}
                >
                  <X color="gray" />
                </span>
              </Button>
            ))}
          </div>

          {/* Custom input for new category */}
          <div className="flex items-center px-2 py-1 gap-2 border-t mt-2 pt-3">
            <input
              className="flex-1 border rounded px-2 ps-3 py-1.5 text-sm focus:outline-none"
              placeholder="Add new category"
              value={inputValue}
              onChange={(e) => {
                e.preventDefault();
                setInputValue(e.target.value);
              }}
            />
            <button
              type="button"
              className="p-1 rounded hover:bg-gray-200"
              onClick={handleAdd}
              disabled={
                data.some((item) => item === inputValue) || inputValue === ""
              }
            >
              <Plus
                className={cn(
                  "w-4 h-4",
                  inputValue === "" && "text-disabled-foreground",
                  data.some((item) => item === inputValue) &&
                    "text-disabled-foreground",
                )}
              />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
