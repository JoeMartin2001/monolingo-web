import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const uri =
  process.env.NEXT_PUBLIC_API_URL + "/graphql" ||
  "http://localhost:4000/graphql";

console.log(uri);

const getApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri, fetch }),
    cache: new InMemoryCache(),
  });
};

export default getApolloClient;
