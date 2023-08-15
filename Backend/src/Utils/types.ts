import { Session } from "next-auth";

export interface UserNameArgs {
  input: {
    userName: string;
  };
}

export interface GraphQLContext {
  session: Session | null | undefined;
}
