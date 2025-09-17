import { fetchWithI18n } from "@/lib/fetcher";

type ResendVerificationResponse =
  | {
      data: {
        success: boolean;
        alreadyVerified: boolean;
      };
    }
  | {
      error: string;
    };

export async function resendVerification(
  email: string
): Promise<ResendVerificationResponse> {
  const res = await fetchWithI18n(process.env.API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          mutation ResendVerification($email: String!) {
              resendVerification(input: { email: $email }) {
                  success
                  alreadyVerified
              }
          }
        `,
      variables: { email },
    }),
  });
  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.resendVerification };
}
