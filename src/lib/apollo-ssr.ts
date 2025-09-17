// lib/apollo-ssr.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri =
  process.env.NEXT_PUBLIC_API_URL + "/graphql" ||
  "http://localhost:4000/graphql";

export function getApolloSSRClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
