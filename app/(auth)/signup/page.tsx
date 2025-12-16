import { SignupForm } from "@/components/auth/SignupForm";
import { constants } from "@/lib/constants";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-16">
        Sign up to {constants.title}
      </h1>
      <div className="min-w-[400px] max-w-[400px]">
        <SignupForm />
        <p className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link href={routes.auth.login} className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
