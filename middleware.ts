import { routes } from "@/lib/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  // All protected routes
  const privateRoutes = Object.values(routes.private);

  const pathname = req.nextUrl.pathname;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL(routes.auth.login, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/recipes/:path*", // because private.addRecipe starts with /recipes
  ],
};
