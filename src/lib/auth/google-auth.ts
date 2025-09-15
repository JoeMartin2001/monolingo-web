type GoogleAuthResponse =
  | {
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }
  | {
      error: string;
    };

export async function googleAuth(token: string): Promise<GoogleAuthResponse> {
  const res = await fetch(process.env.API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            mutation GoogleAuth($token: String!) {
                googleAuth(token: $token) {
                    accessToken
                    refreshToken
                    user { id email username avatarUrl }
                }
            }
        `,
      variables: { token },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { data: json.data.googleAuth };
}
