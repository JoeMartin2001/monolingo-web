"use client";

import { useLocale } from "next-intl";
import { logout } from "@/server/actions/auth";

export function LogoutButton() {
  const locale = useLocale();

  // Hidden input guarantees the locale reaches the server action
  return (
    <form action={logout}>
      <input type="hidden" name="locale" value={locale} />
      <button type="submit">Log out</button>
    </form>
  );
}
