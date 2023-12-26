import { gql } from "apollo-server-core";

const typedef = gql`
  type User {
    id: ID!
    username: String
    email: String
    image: String
  }

  type Query {
    searchUser(username: String!): [User]
  }

  input UserNameInput {
    username: String
  }

  type Mutation {
    createUserName(input: UserNameInput!): CreateUserNameResult
  }

  type CreateUserNameResult {
    success: Boolean
    error: String
  }
`;
export default typedef;
