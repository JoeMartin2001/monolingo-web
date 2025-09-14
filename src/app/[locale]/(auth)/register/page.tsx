"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";
import { Textarea } from "@/components/ui/Textarea";
import AvatarInput from "@/components/ui/AvatarInput";
import { languageOptions, levelOptions } from "@/config/constants/options";
import { SignupUserInput } from "@/lib/auth/signup-user";
import { register } from "./actions";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input: SignupUserInput = {
      email,
      password,
      username,
      nativeLanguage,
      targetLanguage,
      level,
      bio,
      avatar,
    };

    setIsLoading(true);

    const result = await register(input);

    if (result.success) {
      setError(null);

      return router.replace("/dashboard");
    }

    setError(result.error || "Something went wrong");
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-5"
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
            Create your account
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            Join thousands of learners across Central Asia and start your
            language learning journey
          </p>
        </div>

        {/* Registration Form */}
        <div
          className="rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: "var(--background)" }}
        >
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Avatar Upload */}
            <div className="flex justify-center pb-6">
              <AvatarInput
                id="avatar"
                name="avatar"
                label="Profile Picture"
                value={avatar ? URL.createObjectURL(avatar) : undefined}
                onChange={setAvatar}
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: "var(--border)" }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-3"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Account Details
                </span>
              </div>
            </div>

            <Input
              id="username"
              name="username"
              type="text"
              label="Username"
              placeholder="Choose a username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <SelectInput
              id="nativeLanguage"
              name="nativeLanguage"
              label="Native language"
              placeholder="Select your native language"
              options={[...languageOptions, { value: "other", label: "Other" }]}
              required
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
            />

            <SelectInput
              id="targetLanguage"
              name="targetLanguage"
              label="Target language"
              placeholder="Select language to learn"
              options={languageOptions}
              required
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            />

            <SelectInput
              id="level"
              name="level"
              label="Current proficiency level"
              placeholder="Select your current level"
              options={levelOptions}
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />

            <Textarea
              id="bio"
              name="bio"
              label="Bio (optional)"
              placeholder="Tell us about yourself..."
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 focus:ring-blue-500 rounded"
                  style={{
                    accentColor: "var(--primary)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" style={{ color: "var(--foreground)" }}>
                  I agree to the{" "}
                  <Link href="/terms" style={{ color: "var(--primary)" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" style={{ color: "var(--primary)" }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
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

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Already have an account?{" "}
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

export default RegisterPage;
