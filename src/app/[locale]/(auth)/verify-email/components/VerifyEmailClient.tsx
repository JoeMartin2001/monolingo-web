// app/[locale]/(auth)/verify-email/VerifyEmailClient.tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { verifyEmailAction, type VerifyState } from "../actions";
import Link from "next/link";

const initialState: VerifyState = {};

export default function VerifyEmailClient({ token }: { token?: string }) {
  const t = useTranslations("VerifyEmail");
  const [state, formAction] = useActionState(verifyEmailAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (token) formRef.current?.requestSubmit();
  }, [token]);

  if (!token) {
    return (
      <CenteredCard
        tone="error"
        title={t("invalidToken")}
        desc={t("invalidTokenDescription")}
      >
        <Link
          className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
          href="/register"
        >
          {t("registerAgain")}
        </Link>
      </CenteredCard>
    );
  }

  // Auto-submitting… show a lightweight loader while waiting
  if (!state.error && !state.alreadyVerified && !state.tokenExpired) {
    return (
      <>
        <form ref={formRef} action={formAction}>
          <input type="hidden" name="token" value={token} />
        </form>
        <CenteredCard
          tone="info"
          title={t("verifying")}
          desc={t("pleaseWait")}
        />
      </>
    );
  }

  if (state.alreadyVerified) {
    return (
      <CenteredCard
        tone="info"
        title={t("alreadyVerified")}
        desc={t("alreadyVerifiedDescription")}
      >
        <Link
          className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
          href="/login"
        >
          {t("signIn")}
        </Link>
      </CenteredCard>
    );
  }

  if (state.tokenExpired) {
    return (
      <CenteredCard
        tone="warn"
        title={t("tokenExpired")}
        desc={t("tokenExpiredDescription")}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            href="/register"
          >
            {t("registerAgain")}
          </Link>
          <Link
            className="px-6 py-3 border rounded-lg transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
            href="/login"
          >
            {t("signIn")}
          </Link>
        </div>
      </CenteredCard>
    );
  }

  // Generic error
  return (
    <CenteredCard
      tone="error"
      title={t("verificationFailed")}
      desc={state.error || t("verificationFailedDescription")}
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
          href="/register"
        >
          {t("registerAgain")}
        </Link>
        <Link
          className="px-6 py-3 border rounded-lg transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
          href="/login"
        >
          {t("signIn")}
        </Link>
      </div>
    </CenteredCard>
  );
}

// Minimal presentational helper (use your existing classes)
function CenteredCard({
  tone,
  title,
  desc,
  children,
}: {
  tone: "info" | "warn" | "error";
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  const getIconAndColors = () => {
    switch (tone) {
      case "error":
        return {
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          ),
          bgColor: "bg-red-100 dark:bg-red-900/30",
          textColor: "text-red-600",
        };
      case "warn":
        return {
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          ),
          bgColor: "bg-orange-100 dark:bg-orange-900/30",
          textColor: "text-orange-600",
        };
      case "info":
      default:
        return {
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ),
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          textColor: "text-blue-600",
        };
    }
  };

  const { icon, bgColor, textColor } = getIconAndColors();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "var(--background)",
        backgroundImage:
          "linear-gradient(to bottom right, var(--muted), var(--secondary))",
      }}
    >
      <div className="max-w-md w-full text-center">
        <div
          className={`w-16 h-16 ${bgColor} ${textColor} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
        {desc && (
          <p className="mb-6" style={{ color: "var(--muted-foreground)" }}>
            {desc}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
