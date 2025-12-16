import { routes } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full h-svh flex flex-col justify-center items-center">
        <div className="relative min-w-[700px] min-h-[600px] flex flex-col justify-center">
          <Link
            href={routes.public.home}
            className="absolute top-0 left-0 mb-10 flex items-center gap-1 text-muted-foreground"
          >
            <ChevronLeft size={20} /> Back to Home
          </Link>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
