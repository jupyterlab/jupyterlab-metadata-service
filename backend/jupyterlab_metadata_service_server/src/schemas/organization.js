const { gql } = require('apollo-server');

const data = [];
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

  extend type Mutation {
    addOrganization(
      name: String!
    ): OrganizationResponse

    remOrganization(id: ID!): OrganizationResponse!
  }
`;

const resolvers = {
  Query: {
    organizations: () => {
      return data.length ? data : [];
    },
    organization: (root, args) => {
      return data.length >= args.id ? data[args.id] : null
    }
  },
  Mutation: {
    addOrganization: (root, args) => {
      const newData = {
        id: nextId++,
        name: args.name
      };

      data.push(newData);

      return {
        success: true,
        result: newData
      };
    },
    remOrganization: (root, args) => {
      let oldData = null;
      let message = null;
      let status = true;

      if (data.length >= args.id) {
        oldData = data.pop(args.id - 1);
      } else {
        message = 'Data not found.';
        status = false;
      }

      return {
        success: status,
        result: oldData,
        message: message
      };
    }
  }
};

module.exports = { typeDef, resolvers };