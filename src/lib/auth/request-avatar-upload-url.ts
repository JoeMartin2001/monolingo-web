import { gql } from "@apollo/client";
import getApolloClient from "../apollo-client";
import { fetchWithI18n } from "../fetcher";

type RequestAvatarUploadUrlResponse = {
  requestAvatarUploadUrl: {
    url: string;
    key: string;
  };
};

// mutation doc
const REQUEST_AVATAR_UPLOAD_URL = gql`
  mutation RequestAvatarUploadUrl($filename: String!, $mime: String!) {
    requestAvatarUploadUrl(filename: $filename, mime: $mime) {
      url
      key
    }
  }
`;

// returns the S3 key (store it and send with signup)
export async function uploadAvatarAndGetKey(file: File): Promise<string> {
  const client = getApolloClient();

  const { data } = await client.mutate<RequestAvatarUploadUrlResponse>({
    mutation: REQUEST_AVATAR_UPLOAD_URL,
    variables: { filename: file.name, mime: file.type },
  });

  const result = data!.requestAvatarUploadUrl as {
    url: string;
    key: string;
  };

  console.log(result);

  const { url, key } = result;

  // IMPORTANT: use a plain fetch; wrappers that set JSON headers can break S3 PUT
  try {
    const putResp = await fetchWithI18n(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!putResp.ok) {
      const text = await putResp.text().catch((e) => e.message);
      throw new Error(`Avatar upload failed: ${putResp.status} ${text}`);
    }

    return key;
  } catch (error) {
    console.log(error);
    throw new Error(`Avatar upload failed: ${error}`);
  }
}
