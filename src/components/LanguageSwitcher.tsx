import React from "react";
import { LOCALES } from "@/config/constants/locales";
import Link from "next/link";

export const LanguageSwitcher = () => {
  return (
    <div>
      {LOCALES.map((locale) => (
        <Link key={locale} locale={locale} href={`/${locale}`}>
          {locale}
        </Link>
      ))}
    </div>
  );
};
