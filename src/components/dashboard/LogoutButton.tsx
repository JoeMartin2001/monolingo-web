"use client";

import { useLocale, useTranslations } from "next-intl";
import { logout } from "@/server/actions/auth";

export function LogoutButton() {
  const locale = useLocale();
  const t = useTranslations("LogoutButton");

  // Hidden input guarantees the locale reaches the server action
  return (
    <form action={logout}>
      <input type="hidden" name="locale" value={locale} />
      <button type="submit">{t("logout")}</button>
    </form>
  );
}
