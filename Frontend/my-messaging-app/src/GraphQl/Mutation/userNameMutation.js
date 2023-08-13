import { gql } from "@apollo/client";

export const MUTATE_USER_NAME = gql`
  mutation CreateUserName($input: UserNameInput!) {
    createUserName(input: $input) {
      success
      error
    }
  }
`;
