import { fetchWithI18n } from "@/lib/fetcher";

export type SignupUserInput = {
  email: string;
  password: string;
  username: string;
  nativeLanguage: string;
  targetLanguage: string;
  level: string;
  bio: string;
  avatar?: File | null;
  avatarKey?: string | null;
};

type SignupUserResponse =
  | {
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }
  | {
      error: string;
    };

export async function signupUser(
  input: SignupUserInput
): Promise<SignupUserResponse> {
  const res = await fetchWithI18n(
    process.env.NEXT_PUBLIC_API_URL + "/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            mutation SignUp($email: String!, $password: String!, $username: String!, $nativeLanguage: String!, $targetLanguage: String!, $level: LanguageLevel!, $bio: String!, $avatarUrl: String) {
                signup(
                    input: {email: $email, bio: $bio, username: $username, nativeLanguage: $nativeLanguage, targetLanguage: $targetLanguage, level: $level, password: $password, avatarUrl: $avatarUrl}
                ) {
                    accessToken
                    refreshToken
                }
            }
      `,
        variables: {
          ...input,
          avatarUrl: input.avatarKey,
        },
      }),
    }
  );

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.signup };
}
