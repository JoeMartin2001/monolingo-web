// server/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/i18n/routing";

export async function logout() {
  const locale = await getLocale();

  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");

  redirect(locale === DEFAULT_LOCALE ? `/login` : `/${locale}/login`);
}
