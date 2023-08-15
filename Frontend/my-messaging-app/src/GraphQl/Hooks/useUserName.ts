import { CreateUserNameInput, CreateUserNameOutput } from "@/util/types";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATE_USER_NAME } from "../Mutation/userNameMutation";
// import { QUERY_USER_NAME } from "../Queries/userNameQuery";

export const useUserName = (skip?: Boolean) => {
  // const query = useQuery(QUERY_USER_NAME, {});

  const [createUserName, mutation] =
    useMutation<CreateUserNameOutput>(MUTATE_USER_NAME);
  console.log(mutation);
  const createUserNameFn = (input: CreateUserNameInput) =>
    createUserName({ variables: { input } });

  return { createUserNameFn, mutation };
};
