// server/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function logout(formData: FormData) {
  const locale = (formData.get("locale") as string) || routing.defaultLocale;

  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");

  redirect(`/${locale}/login`);
}
