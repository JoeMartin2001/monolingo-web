import { fetchWithI18n } from "@/lib/fetcher";

export type VerifyEmailResponse =
  | {
      data: {
        success: boolean;
        alreadyVerified?: boolean;
        tokenExpired?: boolean;
        user?: boolean;
        accessToken?: string;
        refreshToken?: string;
      };
    }
  | {
      error: string;
    };

export async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  const res = await fetchWithI18n(
    process.env.NEXT_PUBLIC_API_URL + "/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation VerifyEmail($token: String!) {
            verifyEmail(token: $token) {
                success
                alreadyVerified
                tokenExpired
                user {
                    id
                    email
                    username
                    avatarUrl
                }
                accessToken
                refreshToken
            }
          }
        `,
        variables: { token },
      }),
    }
  );

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.verifyEmail };
}
