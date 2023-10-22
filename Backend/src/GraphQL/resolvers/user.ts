import { sessionCheck } from "./../../Functions/sessionCheck";
import { createUserName } from "../../Utils/functions";
import {
  CreateUserNameOutPut,
  GraphQLContext,
  UserNameArgs,
} from "../../Utils/types";

const resolver = {
  Query: {
    searchUser: (parent: any, args: UserNameArgs, context: GraphQLContext) => {
      sessionCheck(context);
      const username: string = args.input.username;
      const { prisma, session } = context;
    },
  },
  Mutation: {
    createUserName: async (
      parent: any,
      args: UserNameArgs,
      context: GraphQLContext
    ): Promise<CreateUserNameOutPut> => {
      const { prisma, session } = context;

      const username: string = args.input.username;
      if (!session?.user) {
        return {
          success: false,
          error: "User Not Authenticated",
        };
      }

      const { id } = session?.user || {};
      return await createUserName({ username, prisma, id });
    },
  },
};
export default resolver;
