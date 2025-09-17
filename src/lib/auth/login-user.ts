import { fetchWithI18n } from "@/lib/fetcher";

type LoginUserResponse =
  | {
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }
  | {
      error: string;
    };

export async function loginUser(
  email: string,
  password: string
): Promise<LoginUserResponse> {
  const res = await fetchWithI18n(
    process.env.NEXT_PUBLIC_API_URL + "/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Login($email: String!, $password: String!) {
              login(input: { email: $email, password: $password }) {
                  accessToken
                  refreshToken
              }
          }
        `,
        variables: { email, password },
      }),
    }
  );
  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.login };
}
