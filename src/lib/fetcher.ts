// lib/fetcher.ts
import { getLocale } from "next-intl/server";

export async function fetchWithI18n(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const locale = await getLocale(); // server-side only
  const headers = new Headers(init?.headers);

  // Ensure Accept-Language is always set
  headers.set("Accept-Language", locale);
  headers.set("x-locale", locale);

  return fetch(input, {
    ...init,
    headers,
  });
}
