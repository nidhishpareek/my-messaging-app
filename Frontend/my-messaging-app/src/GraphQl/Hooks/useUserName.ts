import { createUserName } from "./../../../../../Backend/src/Utils/functions";
import { CreateUserNameInput, CreateUserNameOutput } from "@/util/types";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATE_USER_NAME } from "../Mutation/userNameMutation";
// import { QUERY_USER_NAME } from "../Queries/userNameQuery";

export const useUserName = (skip?: Boolean) => {
  // const query = useQuery(QUERY_USER_NAME, {});

  const [createUserName, mutation] = useMutation(MUTATE_USER_NAME);

  const createUserNameFn = async (input: CreateUserNameInput) => {
    const a: CreateUserNameOutput = await createUserName({
      variables: { input },
    });

    return a?.data?.createUserName || {};
  };

  return { createUserNameFn, mutation };
};
