export type SignupUserInput = {
  email: string;
  password: string;
  username: string;
  nativeLanguage: string;
  targetLanguage: string;
  level: string;
  bio: string;
  avatar?: File | null;
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
  // Handle avatar upload - convert to data URL for now
  let avatarUrl = "";
  if (input.avatar) {
    try {
      avatarUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(input.avatar!);
      });
    } catch (error) {
      console.error("Error converting avatar to data URL:", error);
      // Continue without avatar
    }
  }

  const res = await fetch(process.env.API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            mutation SignUp($email: String!, $password: String!, $username: String!, $nativeLanguage: String!, $targetLanguage: String!, $level: LanguageLevel!, $bio: String!, $avatarUrl: String!) {
                signup(
                    input: {email: $email, bio: $bio, username: $username, avatarUrl: $avatarUrl, nativeLanguage: $nativeLanguage, targetLanguage: $targetLanguage, level: $level, password: $password}
                ) {
                    accessToken
                    refreshToken
                }
            }
      `,
      variables: {
        ...input,
        avatarUrl,
      },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.signup };
}
