"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const themes = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "💻" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];

  if (!mounted) {
    return (
      <div
        className="flex items-center space-x-2 px-3 py-2 rounded-lg"
        style={{ color: "var(--muted-foreground)" }}
      >
        <span className="text-lg">💻</span>
        <span className="hidden sm:inline">System</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 transition-colors rounded-lg hover:opacity-80"
        style={{
          color: "var(--muted-foreground)",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--muted)";
          e.currentTarget.style.color = "var(--foreground)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--muted-foreground)";
        }}
        aria-label="Toggle theme"
      >
        <span className="text-lg">{currentTheme.icon}</span>
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-20"
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
            }}
          >
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg"
                style={{
                  color:
                    theme === themeOption.value
                      ? "var(--primary)"
                      : "var(--foreground)",
                  backgroundColor:
                    theme === themeOption.value
                      ? "var(--accent)"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (theme !== themeOption.value) {
                    e.currentTarget.style.backgroundColor = "var(--muted)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== themeOption.value) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span className="text-lg">{themeOption.icon}</span>
                <span className="text-sm font-medium">{themeOption.label}</span>
                {theme === themeOption.value && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
