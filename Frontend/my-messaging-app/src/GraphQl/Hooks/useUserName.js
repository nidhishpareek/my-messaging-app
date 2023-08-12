import { useMutation, useQuery } from "@apollo/client";
import { MUTATE_USER_NAME } from "../Mutation/userNameMutation";
import { QUERY_USER_NAME } from "../Queries/userNameQuery";

export const useUserName = (skip) => {
  // const query = useQuery(QUERY_USER_NAME, {});
  const [createUserName, mutation] = useMutation(MUTATE_USER_NAME);

  const createUserNameFn = (input) => createUserName({ variables: { input } });

  return { createUserNameFn, mutation };
};
