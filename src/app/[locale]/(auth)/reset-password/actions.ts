"use server";

import { resetPassword } from "@/lib/auth/reset-password";
import { ResetPasswordInput } from "@/lib/auth/reset-password";

export async function resetPasswordAction(input: ResetPasswordInput) {
  try {
    const res = await resetPassword(input);

    if ("error" in res) {
      return { success: false, error: res.error };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error as string };
  }
}
