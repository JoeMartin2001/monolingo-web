"use client";

import { authenticate } from "./actions";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
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
            Welcome back
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            Sign in to continue your language learning journey
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
              label="Email address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
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
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
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
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-3">
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
              <GoogleIcon className="w-5 h-5" />
              <span className="ml-2">Google</span>
            </button>
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
              <span className="ml-2">Facebook</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium"
                style={{ color: "var(--primary)" }}
              >
                Sign up for free
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

export default LoginPage;
