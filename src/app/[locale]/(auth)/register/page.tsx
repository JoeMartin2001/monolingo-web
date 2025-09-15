"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";
import { Textarea } from "@/components/ui/Textarea";
import AvatarInput from "@/components/ui/AvatarInput";
import { languageOptions, levelOptions } from "@/config/constants/options";
import { SignupUserInput } from "@/lib/auth/signup-user";
import { register, registerWithGoogleAuthAction } from "./actions";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useTranslations } from "next-intl";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const RegisterPage = () => {
  const router = useRouter();
  const t = useTranslations("RegisterPage");

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

  // Create language options with translated "Other" option
  const languageOptionsWithOther = [
    ...languageOptions,
    { value: "other", label: t("other") },
  ];

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

  const onGoogleAuth = async (idToken: string) => {
    setIsLoading(true);

    try {
      const result = await registerWithGoogleAuthAction(idToken);

      if (result?.success) {
        return router.replace("/dashboard");
      }

      setError(result?.error || "Something went wrong");
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
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
            {t("createYourAccount")}
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            {t("joinThousandsOfLearners")}
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
                label={t("profilePicture")}
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
                  {t("accountDetails")}
                </span>
              </div>
            </div>

            <Input
              id="username"
              name="username"
              type="text"
              label={t("username")}
              placeholder={t("chooseUsername")}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              id="email"
              name="email"
              type="email"
              label={t("emailAddress")}
              placeholder={t("enterYourEmail")}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label={t("password")}
              placeholder={t("createPassword")}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={t("confirmPassword")}
              placeholder={t("confirmYourPassword")}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <SelectInput
              id="nativeLanguage"
              name="nativeLanguage"
              label={t("nativeLanguage")}
              placeholder={t("selectNativeLanguage")}
              options={languageOptionsWithOther}
              required
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
            />

            <SelectInput
              id="targetLanguage"
              name="targetLanguage"
              label={t("targetLanguage")}
              placeholder={t("selectLanguageToLearn")}
              options={languageOptions}
              required
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            />

            <SelectInput
              id="level"
              name="level"
              label={t("currentProficiencyLevel")}
              placeholder={t("selectCurrentLevel")}
              options={levelOptions}
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />

            <Textarea
              id="bio"
              name="bio"
              label={t("bioOptional")}
              placeholder={t("tellUsAboutYourself")}
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
                  {t("agreeToTerms")}{" "}
                  <Link href="/terms" style={{ color: "var(--primary)" }}>
                    {t("termsOfService")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link href="/privacy" style={{ color: "var(--primary)" }}>
                    {t("privacyPolicy")}
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? t("creatingAccount") : t("createAccount")}
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
          <div className="mt-6 grid grid-cols-1 gap-3">
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
          </div>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {t("alreadyHaveAccount")}{" "}
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

export default RegisterPage;
