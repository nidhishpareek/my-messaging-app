import { UserNameArgs } from "../../Utils/types";

const resolver = {
  Query: {
    searchUser: () => {},
  },
  Mutation: {
    createUserName: (parent: any, args: UserNameArgs, context: any) => {
      console.log("input", args.input);
      console.log("contest", context);
    },
  },
};
export default resolver;
