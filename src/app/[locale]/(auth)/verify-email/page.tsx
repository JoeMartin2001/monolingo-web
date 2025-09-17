// app/[locale]/(auth)/verify-email/page.tsx
import VerifyEmailClient from "./components/VerifyEmailClient";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token;
  return <VerifyEmailClient token={token} />;
}
