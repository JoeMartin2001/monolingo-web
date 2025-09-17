"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");

  revalidatePath("/explore");
  redirect("/login");
}
