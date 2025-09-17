// app/[locale]/(auth)/verify-email/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyEmail } from "@/lib/auth/verify-email";

export type VerifyState = {
  error?: string | null;
  alreadyVerified?: boolean;
  tokenExpired?: boolean;
};

export async function verifyEmailAction(
  _prev: VerifyState,
  formData: FormData
): Promise<VerifyState> {
  const token = formData.get("token") as string;

  const result = await verifyEmail(token);
  if ("error" in result) {
    return { error: result.error };
  }

  const data = result.data;

  if (data?.alreadyVerified) return { alreadyVerified: true };
  if (data?.tokenExpired) return { tokenExpired: true };

  const cookiesStore = await cookies(); // no await

  // If backend returned tokens, set them here (allowed in Server Action)
  if (data?.accessToken && data?.refreshToken) {
    cookiesStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    cookiesStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  }

  redirect(`/dashboard`);
}
