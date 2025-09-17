// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { TLocale } from "./config/constants/locales";

const intl = createMiddleware(routing);

// segment-safe matcher
const isAt = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`);

export function middleware(req: NextRequest) {
  // 1) Run next-intl first
  const intlRes = intl(req);

  // If next-intl triggered a REDIRECT, return immediately
  const isRedirect = intlRes?.headers.has("location");
  if (isRedirect) return intlRes!;

  // If next-intl triggered a REWRITE, read its target and use it for auth checks
  const rewriteHeader = intlRes?.headers.get("x-middleware-rewrite");
  const effectivePathname = rewriteHeader
    ? new URL(rewriteHeader).pathname
    : req.nextUrl.pathname;

  // 2) Auth checks based on the effective (possibly rewritten) pathname
  const accessToken = req.cookies.get("accessToken")?.value;

  const firstSeg = effectivePathname.split("/")[1] ?? "";
  const hasLocalePrefix = routing.locales.includes(firstSeg as TLocale);
  const locale = hasLocalePrefix ? firstSeg : routing.defaultLocale;

  const withLocale = (p: string) =>
    hasLocalePrefix && locale !== routing.defaultLocale ? `/${locale}${p}` : p;

  const loginPath = withLocale("/login");
  const registerPath = withLocale("/register");
  const forgotPasswordPath = withLocale("/forgot-password");
  const resetPasswordPath = withLocale("/reset-password");
  const explorePath = withLocale("/explore");

  const isExplore = isAt(effectivePathname, explorePath);
  const isAuthPage =
    effectivePathname === loginPath ||
    effectivePathname === registerPath ||
    effectivePathname === forgotPasswordPath ||
    effectivePathname === resetPasswordPath;

  const isLocaleRoot = hasLocalePrefix && effectivePathname === `/${locale}`;

  // Not logged in → block explore
  if (!accessToken && isExplore) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  // Logged in → block auth pages & locale root
  if (accessToken && (isAuthPage || isLocaleRoot)) {
    return NextResponse.redirect(new URL(explorePath, req.url));
  }

  // 3) No auth redirect → return next-intl's response if it exists (preserves rewrite),
  //    otherwise just continue.
  return intlRes ?? NextResponse.next();
}

// Non-static, non-API routes
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
