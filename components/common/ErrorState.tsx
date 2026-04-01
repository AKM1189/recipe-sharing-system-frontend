import { TriangleAlert } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  message?: string;
};

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 min-h-[300px] text-center">
      <TriangleAlert
        size={40}
        color="var(--color-destructive)"
        className="mb-5"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2">{message}</p>
    </div>
  );
}
