// lib/apollo-ssr.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function getApolloSSRClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
