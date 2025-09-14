// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // --- If not logged in ---
  if (!accessToken) {
    // trying to access protected routes
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // allow marketing, login, register
  }

  // --- If logged in ---
  // prevent accessing auth/marketing pages, always go to /dashboard
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/(marketing)")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/(marketing)/:path*",
  ],
};
