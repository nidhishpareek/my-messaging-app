import { gql } from "apollo-server-core";

const typedef = gql`
  type User {
    id: ID!
    userName: String
    email: String
    # image: Image
  }

  type Query {
    searchUser(userName: String!): User
  }

  type Mutation {
    createUserName(userName: String): CreateUserNameResult
  }

  type CreateUserNameResult {
    success: Boolean
    error: Boolean
  }
`;
export default typedef;
