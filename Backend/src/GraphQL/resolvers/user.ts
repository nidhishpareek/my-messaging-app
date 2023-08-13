interface UserNameArgs {
  input: {
    userName: string;
  };
}

const resolver = {
  Query: {
    searchUser: () => {},
  },
  Mutation: {
    createUserName: (parent: any, args: UserNameArgs, context: any) => {},
  },
};
export default resolver;
