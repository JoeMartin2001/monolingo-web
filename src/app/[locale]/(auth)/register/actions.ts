"use server";

import { cookies } from "next/headers";
import { signupUser } from "@/lib/auth/signup-user";
import { SignupUserInput } from "@/lib/auth/signup-user";

export type RegisterState =
  | {
      success: true;
      error: null;
    }
  | {
      success: false;
      error: string;
    };

export async function register(input: SignupUserInput) {
  try {
    const cookiesStore = await cookies();

    // Call your GraphQL or REST API here
    const res = await signupUser(input);

    if ("error" in res) {
      return { success: false, error: res.error };
    }

    const { accessToken, refreshToken } = res.data;

    // Set cookies (httpOnly)
    cookiesStore.set("accessToken", accessToken, {
      httpOnly: true,
    });

    cookiesStore.set("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return { success: true };
  } catch (error) {
    const castedError = error as Error;

    console.log(castedError);

    return {
      success: false,
      error: castedError.message || "Something went wrong, please try again.",
    };
  }
}
