import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("LandingPage");

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--background)",
        backgroundImage:
          "linear-gradient(to bottom right, var(--muted), var(--secondary))",
      }}
    >
      {/* Navigation */}
      <nav
        className="px-6 py-4 border-b"
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
              className="text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Monolingo
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />

            <a
              href="/login"
              className="px-4 py-2 rounded-lg transition-colors hover:opacity-80"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t("signIn")}
            </a>
            <a
              href="/register"
              className="px-6 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {t("getStarted")}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "var(--foreground)" }}
          >
            {t("learnLanguagesWith")}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              {t("aiAndCommunity")}
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("startLearningFree")}
            </a>
            <a
              href="/register"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-lg font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              {t("learnMore")}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="px-6 py-20"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {t("howMonolingoWorks")}
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t("howMonolingoWorksDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Chat with Language Mates */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                {t("chatWithLanguageMates")}
              </h3>
              <p
                className="text-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t("chatWithLanguageMatesDescription")}
              </p>
            </div>

            {/* Practice with AI Bots */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                {t("practiceWithAIBots")}
              </h3>
              <p
                className="text-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t("practiceWithAIBotsDescription")}
              </p>
            </div>

            {/* Topic Discussion Group Calls */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                {t("topicDiscussionGroupCalls")}
              </h3>
              <p
                className="text-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t("topicDiscussionGroupCallsDescription")}
              </p>
            </div>

            {/* Join Communities */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                {t("joinCommunities")}
              </h3>
              <p
                className="text-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t("joinCommunitiesDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("readyToStartLearning")}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t("readyToStartLearningDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("startLearningFree")}
            </a>
            <a
              href="/register"
              className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {t("learnMore")}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12"
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold">Monolingo</span>
          </div>
          <p className="mb-4" style={{ color: "var(--muted-foreground)" }}>
            {t("completeLanguageLearningPlatform")}
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            &copy; 2024 Monolingo. {t("allRightsReserved")}
          </p>
        </div>
      </footer>
    </div>
  );
}
