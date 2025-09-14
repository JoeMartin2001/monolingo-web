import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const getApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/graphql",
      credentials: "include", // if you need cookies
    }),
    cache: new InMemoryCache(),
  });
};

export default getApolloClient;
