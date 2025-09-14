export type SignupUserInput = {
  email: string;
  password: string;
  username: string;
  nativeLanguage: string;
  targetLanguage: string;
  level: string;
  bio: string;
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
  const res = await fetch(process.env.API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            mutation SignUp($email: String!, $password: String!, $username: String!, $nativeLanguage: String!, $targetLanguage: String!, $level: LanguageLevel!, $bio: String!) {
                signup(
                    input: {email: $email, bio: $bio, username: $username, avatarUrl: "", nativeLanguage: $nativeLanguage, targetLanguage: $targetLanguage, level: $level, password: $password}
                ) {
                    accessToken
                    refreshToken
                }
            }
      `,
      variables: input,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.signup };
}
