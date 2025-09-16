"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import ThemeToggle from "@/components/ThemeToggle";
import { useTranslations } from "next-intl";
import { resetPasswordAction } from "./actions";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("ResetPasswordPage");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid or missing reset token");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await resetPasswordAction({
        token,
        newPassword: password,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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

          {/* Success Message */}
          <div
            className="rounded-2xl shadow-lg p-8 text-center"
            style={{ backgroundColor: "var(--background)" }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {t("passwordResetSuccess")}
            </h1>
            <p style={{ color: "var(--muted-foreground)" }} className="mb-6">
              {t("passwordResetSuccessDescription")}
            </p>
            <div
              className="text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t("redirectingToLogin")}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {t("resetYourPassword")}
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            {t("enterNewPasswordDescription")}
          </p>
        </div>

        {/* Reset Password Form */}
        <div
          className="rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: "var(--background)" }}
        >
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              id="password"
              name="password"
              type="password"
              label={t("newPassword")}
              placeholder={t("enterNewPassword")}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={t("confirmNewPassword")}
              placeholder={t("confirmNewPasswordPlaceholder")}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading || !token}
            >
              {isLoading ? t("resettingPassword") : t("resetPassword")}
            </button>

            {error && (
              <p className="text-sm" style={{ color: "var(--destructive)" }}>
                {error}
              </p>
            )}
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {t("rememberYourPassword")}{" "}
              <Link
                href="/login"
                className="font-medium"
                style={{ color: "var(--primary)" }}
              >
                {t("signIn")}
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

export default ResetPasswordPage;
