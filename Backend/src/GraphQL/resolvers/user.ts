import {
  CreateUserNameOutPut,
  GraphQLContext,
  UserNameArgs,
} from "../../Utils/types";

const resolver = {
  Query: {
    searchUser: () => {},
  },
  Mutation: {
    createUserName: async (
      parent: any,
      args: UserNameArgs,
      context: GraphQLContext
    ): Promise<CreateUserNameOutPut> => {
      const { prisma, session } = context;
      console.log("input", args.input);
      console.log("contest", context);

      if (!session?.user) {
        return {
          success: false,
          error: "User Not Authenticated",
        };
      }

      const { id } = session.user || {};

      return { success: true, error: "failed" };
    },
  },
};
export default resolver;
