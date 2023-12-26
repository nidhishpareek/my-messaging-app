import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../Utils/types";

export const sessionCheck = (context: GraphQLContext) => {
  const { session } = context;
  if (!session?.user) {
    throw new ApolloError("User Not Authenticated");
  }
};
