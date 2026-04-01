import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePaginationStore } from "@/store/pagination.store";
import { twMerge } from "tailwind-merge";

export default function CustomPagination() {
  const { pagination, onPageChange } = usePaginationStore();

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem
          onClick={() => onPageChange(Math.max(pagination.current - 1, 1))}
          className="cursor-pointer"
        >
          <PaginationPrevious />
        </PaginationItem>

        {Array.from({ length: pagination.total }).map((_, i) => (
          <PaginationItem
            key={i}
            onClick={() => onPageChange(i + 1)}
            className="cursor-pointer"
          >
            <PaginationLink
              className={twMerge(
                i + 1 === pagination.current && "border border-primary",
              )}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>*/}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              onPageChange(Math.min(pagination.current + 1, pagination.total))
            }
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
