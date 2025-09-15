"use client";

import { authenticate, googleAuthAction } from "./actions";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { useTranslations } from "next-intl";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { gql } from "@apollo/client";
// import getApolloClient from "@/lib/apollo-client";

// const client = getApolloClient();

// const LOGIN_USER = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(input: { email: $email, password: $password }) {
//       accessToken
//       refreshToken
//     }
//   }
// `;

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("LoginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await authenticate(email, password, rememberMe);

      if (result.success) {
        return router.replace("/dashboard");
      }

      setError(result.error || "Something went wrong");
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleAuth = async (idToken: string) => {
    const result = await googleAuthAction(idToken);

    if (result?.success) {
      return router.replace("/dashboard");
    }

    setError(result?.error || "Something went wrong");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "var(--background)",
        backgroundImage:
          "linear-gradient(to bottom right, var(--muted), var(--secondary))",
      }}
    >
      <div className="max-w-md w-full">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span
              className="text-3xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Monolingo
            </span>
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            {t("welcomeBack")}
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            {t("signInToContinue")}
          </p>
        </div>

        {/* Login Form */}
        <div
          className="rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: "var(--background)" }}
        >
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label={t("emailAddress")}
              placeholder={t("enterYourEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label={t("password")}
              placeholder={t("enterYourPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 focus:ring-blue-500 rounded"
                  style={{
                    accentColor: "var(--primary)",
                    borderColor: "var(--border)",
                  }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {t("rememberMe")}
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: "var(--primary)" }}
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? t("signingIn") : t("signIn")}
            </button>

            {error && (
              <p className="text-sm" style={{ color: "var(--destructive)" }}>
                {error}
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: "var(--border)" }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {t("orContinueWith")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <GoogleLogin
                onSuccess={(cred) => {
                  const idToken = cred.credential!;

                  onGoogleAuth(idToken);
                }}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>

            {/* <button
              className="w-full inline-flex justify-center py-3 px-4 border rounded-lg shadow-sm text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--muted-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
            >
              <GoogleIcon className="w-5 h-5" />
              <span className="ml-2">{t("google")}</span>
            </button> */}
            <button
              className="w-full inline-flex justify-center py-3 px-4 border rounded-lg shadow-sm text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--muted-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background)";
              }}
            >
              <FacebookIcon className="w-5 h-5" />
              <span className="ml-2">{t("facebook")}</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {t("dontHaveAccount")}{" "}
              <Link
                href="/register"
                className="font-medium"
                style={{ color: "var(--primary)" }}
              >
                {t("signUpForFree")}
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
