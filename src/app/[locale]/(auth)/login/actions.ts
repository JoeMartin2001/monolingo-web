"use server";

import { cookies } from "next/headers";
import { loginUser } from "@/lib/auth/login-user";
import { googleAuth } from "@/lib/auth/google-auth";

export type LoginState =
  | {
      success: true;
    }
  | {
      success: false;
      error: string | null;
    };

export async function authenticate(
  email: string,
  password: string,
  rememberMe: boolean
): Promise<LoginState> {
  try {
    const cookiesStore = await cookies();

    // Call your GraphQL or REST API here
    const res = await loginUser(email, password);

    if ("error" in res) {
      return { success: false, error: res.error };
    }

    const { accessToken, refreshToken } = res.data;

    // Set cookies (httpOnly)
    cookiesStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : undefined,
    });

    cookiesStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : undefined,
    });

    // Redirect to explore
    return { success: true };
  } catch (error) {
    const castedError = error as Error;

    return {
      success: false,
      error: castedError.message || "Something went wrong, please try again.",
    } as LoginState;
  }
}

export async function googleAuthAction(idToken: string) {
  try {
    const cookiesStore = await cookies();

    const res = await googleAuth(idToken);

    if ("error" in res) {
      return { success: false, error: res.error };
    }

    const { accessToken, refreshToken } = res.data;

    cookiesStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    cookiesStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error as string };
  }
}
