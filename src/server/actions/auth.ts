// server/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logout() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");

  revalidatePath("/login");
  redirect("/login");
}
