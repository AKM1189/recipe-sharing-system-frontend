import { LoginForm } from "@/components/auth/LoginForm";
import { constants } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-16">
        Log in to {constants.title}
      </h1>
      <div className="min-w-[400px] max-w-[400px]">
        <LoginForm />
        <div className="w-full flex justify-between mt-3 text-sm">
          <Link href={routes.auth.forgotPassword}>Lost your password? </Link>
          <Link href={routes.auth.signup} className="text-primary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
