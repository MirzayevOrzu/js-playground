import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    price: Int!
  }
`;

export default typeDefs;
