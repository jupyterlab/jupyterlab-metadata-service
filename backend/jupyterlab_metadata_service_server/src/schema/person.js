const { gql } = require('apollo-server');

const typeDef = gql`
  type Person {
    id: ID!
    name: String
  }

  type PersonResponse {
    success: Boolean!
    message: String
    result: Person
  }

`;

module.exports = typeDef;