import { PrismaClient } from "@prisma/client";
import { User } from "next-auth";

export interface UserX extends User {
  id: string;
  username: string;
}
export interface Session {
  user: UserX;
}
export interface CreateUserNameOutPut {
  success: boolean;
  error: string;
}

export interface UserNameArgs {
  input: {
    username: string;
  };
}

export interface GraphQLContext {
  session: Session | null | undefined;
  prisma: PrismaClient;
}

export interface CreateUserNameOutPut {
  success: boolean;
  error: string;
}
