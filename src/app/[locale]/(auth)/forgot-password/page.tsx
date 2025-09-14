import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/Input";
import ThemeToggle from "@/components/ThemeToggle";

const ForgotPasswordPage = () => {
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
            Forgot your password?
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            No worries! Enter your email address and we&apos;ll send you a link
            to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <div
          className="rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: "var(--background)" }}
        >
          <form className="space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email address"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Send reset link
            </button>
          </form>

          {/* Success Message (hidden by default) */}
          <div
            className="mt-6 p-4 rounded-lg"
            style={{
              backgroundColor: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5"
                  style={{ color: "var(--primary)" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm" style={{ color: "var(--foreground)" }}>
                  Password reset link sent! Check your email for instructions.
                </p>
              </div>
            </div>
          </div>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium"
                style={{ color: "var(--primary)" }}
              >
                Sign in
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
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
