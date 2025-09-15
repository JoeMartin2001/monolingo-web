"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

const LOCALES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

export function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const currentLocale = LOCALES.find((l) => l.code === active) || LOCALES[0];

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
        aria-label="Toggle language"
      >
        <span className="text-lg">{currentLocale.flag}</span>
        <span className="inline">{currentLocale.label}</span>
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
          className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg z-[60] focus:outline-none"
          style={{
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
          }}
          anchor="bottom end"
        >
          {LOCALES.map((locale) => (
            <MenuItem key={locale.code} as={Fragment}>
              {({ active: isActive }) => (
                <Link
                  href={{ pathname, query }}
                  locale={locale.code}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg"
                  style={{
                    color:
                      active === locale.code
                        ? "var(--primary)"
                        : "var(--foreground)",
                    backgroundColor:
                      active === locale.code
                        ? "var(--accent)"
                        : isActive
                        ? "var(--muted)"
                        : "transparent",
                  }}
                >
                  <span className="text-lg">{locale.flag}</span>
                  <span className="text-sm font-medium">{locale.label}</span>
                  {active === locale.code && (
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
                </Link>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
