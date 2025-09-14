// app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // per next-intl docs
};

// Enable SSG for all locales under this layout
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale from URL segment
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering and make locale available to server components
  setRequestLocale(locale);

  // Read messages configured via i18n/request.ts
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
