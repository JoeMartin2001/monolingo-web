import { fetchWithI18n } from "@/lib/fetcher";

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
};

type ResetPasswordResponse =
  | {
      success: boolean;
    }
  | {
      error: string;
    };

export async function resetPassword(
  input: ResetPasswordInput
): Promise<ResetPasswordResponse> {
  console.log(input);

  const res = await fetchWithI18n(
    process.env.NEXT_PUBLIC_API_URL + "/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input)
            }
        `,
        variables: { input },
      }),
    }
  );

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { success: json.data };
}
