import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.example.com",
  cache: new InMemoryCache(),
  credentials: "include",
});
