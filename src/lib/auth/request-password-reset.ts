type RequestPasswordResetResponse =
  | {
      success: boolean;
    }
  | {
      error: string;
    };

export async function requestPasswordReset(
  email: string
): Promise<RequestPasswordResetResponse> {
  const res = await fetch(process.env.API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          mutation RequestPasswordReset($email: String!) {
            requestPasswordReset(input: { email: $email })
          }
        `,
      variables: { email },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    return { error: json.errors[0].message };
  }

  return { success: json.data };
}
