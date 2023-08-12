import { gql } from "@apollo/client";

export const MUTATE_USER_NAME = gql`
  mutation CreateUser($input: any!) {
    createUser(input: $input) {
      success
      error
    }
  }
`;
