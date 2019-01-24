const { gql } = require('apollo-server');

const organizations = [];
let nextId = 1;

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

  extend type Query {
    organizations: [Organization]
    organization(id: Int!): Organization
  }

`;

const resolvers = {
  Query: {
    organizations: () => {
      return organizations.length ? organizations : [];
    },
    organization: (id) => {
      return organizations[id]
    }
  }
};

module.exports = { typeDef, resolvers };