import { GraphQLContext, UserNameArgs } from "../../Utils/types";

const resolver = {
  Query: {
    searchUser: () => {},
  },
  Mutation: {
    createUserName: (
      parent: any,
      args: UserNameArgs,
      context: GraphQLContext
    ) => {
      console.log("input", args.input);
      console.log("contest", context);
    },
  },
};
export default resolver;
