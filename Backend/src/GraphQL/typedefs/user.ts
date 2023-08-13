import { gql } from "apollo-server-core";

const typedef = gql`
  type User {
    id: ID!
    userName: String
    email: String
    image: String
  }

  type Query {
    searchUser(userName: String!): User
  }

  input UserNameInput {
    userName: String
  }

  type Mutation {
    createUserName(input: UserNameInput!): CreateUserNameResult
  }

  type CreateUserNameResult {
    success: Boolean
    error: Boolean
  }
`;
export default typedef;
