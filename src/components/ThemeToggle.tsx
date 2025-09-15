"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("ThemeToggle");

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { value: "light", label: t("light"), icon: "☀️" },
    { value: "dark", label: t("dark"), icon: "🌙" },
    { value: "system", label: t("system"), icon: "💻" },
  ] as const;

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];

  if (!mounted) return null;

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className="flex items-center space-x-2 px-3 py-2 transition-colors rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
        aria-label={t("toggleTheme")}
      >
        <span className="text-lg">{currentTheme.icon}</span>
        <span className="inline">{currentTheme.label}</span>
        <svg
          className="w-4 h-4 transition-transform ui-open:rotate-180"
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
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-[60] focus:outline-none"
          style={{
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
          }}
          anchor="bottom end"
        >
          {themes.map((themeOption) => (
            <MenuItem key={themeOption.value} as={Fragment}>
              {({ active }) => (
                <button
                  onClick={() => setTheme(themeOption.value)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg"
                  style={{
                    color:
                      theme === themeOption.value
                        ? "var(--primary)"
                        : "var(--foreground)",
                    backgroundColor:
                      theme === themeOption.value
                        ? "var(--accent)"
                        : active
                        ? "var(--muted)"
                        : "transparent",
                  }}
                >
                  <span className="text-lg">{themeOption.icon}</span>
                  <span className="text-sm font-medium">
                    {themeOption.label}
                  </span>
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
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
