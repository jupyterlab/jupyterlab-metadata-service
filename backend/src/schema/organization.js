const { gql } = require('apollo-server');

const typeDef = gql`
  type Organization {
    id: ID!
    name: String
  }

  type OrganizationResponse {
    success: Boolean!
    message: String
    result: Organization
  }

`;

module.exports = typeDef;