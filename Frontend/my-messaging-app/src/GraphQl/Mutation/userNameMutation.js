import { gql } from "apollo-server-express";

export const MUTATE_USER_NAME = gql`
  mutation CreateUser($input: any!) {
    createUser(input: $input) {
      success
      error
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;
