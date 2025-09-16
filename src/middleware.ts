import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

const injectLocale = (path: string, locale: string) => {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
};

export function middleware(req: NextRequest) {
  // 1) Ensure locale prefix or redirect based on NEXT_LOCALE/Accept-Language
  const i18nResponse = intl(req);
  if (i18nResponse) return i18nResponse;

  // 2) Auth checks (locale-aware)
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;

  // Extract current locale from /{locale}/...
  const locale = pathname.split("/")[1] || routing.defaultLocale;

  const loginPath = injectLocale(`/login`, locale);
  const registerPath = injectLocale(`/register`, locale);
  const forgotPasswordPath = injectLocale(`/forgot-password`, locale);
  const dashboardPath = injectLocale(`/dashboard`, locale);
  const resetPasswordPath = injectLocale(`/reset-password`, locale);

  const isDashboard = pathname.startsWith(dashboardPath);
  const isAuthPage =
    pathname === loginPath ||
    pathname === registerPath ||
    pathname === forgotPasswordPath ||
    pathname === resetPasswordPath;

  const isLocaleRoot = pathname === `/${locale}`; // e.g., /en

  // Not logged in → block dashboard
  if (!accessToken) {
    if (isDashboard) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }

    return NextResponse.next();
  }

  // Logged in → block auth pages and locale root
  if (accessToken && (isAuthPage || isLocaleRoot)) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  return NextResponse.next();
}

// Single, clean matcher: all non-static, non-API routes
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
