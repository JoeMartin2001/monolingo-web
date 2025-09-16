import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { LandingDrawer } from "./components/LandingDrawer";

export default async function Home() {
  const t = await getTranslations("LandingPage");

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        background: "var(--background)",
        backgroundImage:
          "linear-gradient(to bottom right, var(--muted), var(--secondary))",
      }}
    >
      {/* Navigation */}
      <nav
        className="px-4 sm:px-6 py-4 border-b"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Monolingo
            </span>
          </div>

          <LandingDrawer />

          <div className="md:flex hidden items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />

            <Link
              href="/login"
              className="px-3 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {t("signIn")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            {t("learnLanguagesWith")}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline">
              {" "}
              {t("aiAndCommunity")}
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("startLearningFree")}
            </Link>
            <Link
              href="/register"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
