"use server";

import { requestPasswordReset } from "@/lib/auth/request-password-reset";

export async function requestPasswordResetAction(email: string) {
  try {
    const res = await requestPasswordReset(email);

    if ("error" in res) {
      return { success: false, error: res.error };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error as string };
  }
}
