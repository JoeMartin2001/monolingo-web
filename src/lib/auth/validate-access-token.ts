// lib/auth.ts
import { cookies as getCookies } from "next/headers";

export async function getValidAccessToken() {
  const cookieStore = await getCookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) return null;

  // Check if expired (depends on how you encode JWT)
  const isExpired = isJwtExpired(accessToken);
  if (!isExpired) return accessToken;

  if (!refreshToken) return null;

  // call backend refresh mutation
  const res = await fetch(process.env.API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation RefreshToken($refreshToken: String!) {
          refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
          }
        }
      `,
      variables: { refreshToken },
    }),
  });

  const { data } = await res.json();
  if (!data?.refreshToken) return null;

  // Update cookies
  cookieStore.set("accessToken", data.refreshToken.accessToken, {
    httpOnly: true,
    secure: true,
  });
  cookieStore.set("refreshToken", data.refreshToken.refreshToken, {
    httpOnly: true,
    secure: true,
  });

  return data.refreshToken.accessToken;
}

// helper
function isJwtExpired(token: string) {
  const [, payload] = token.split(".");
  const { exp } = JSON.parse(Buffer.from(payload, "base64").toString());

  return Date.now() >= exp * 1000;
}
