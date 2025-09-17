import { defineRouting } from "next-intl/routing";
import { LOCALES } from "@/config/constants/locales";

export const DEFAULT_LOCALE = "uz";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
  // localePrefix: "always",
  localePrefix: "as-needed",
  // localePrefix: "never",
});
