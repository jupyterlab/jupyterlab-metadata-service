const { gql } = require('apollo-server');

const typeDef = gql`
  type Organization {
    id: ID!
    name: String
    email: String
    legalName: String
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
    // TODO: implement pagination
    organizations: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.OrganizationAPI.fetchall();
    },
    organization: (root, args, { dataSources } ) => {
      return dataSources.OrganizationAPI.getByID(args.id);
    }
  },
  Mutation: {
    addOrganization: async (root, args, { dataSources }) => {
      let newData = {
        name: args.name
      };

      newData = dataSources.OrganizationAPI.insert(newData);

      return {
        success: true,
        result: newData
      };
    },
    remOrganization: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.OrganizationAPI.deleteByID(args.id);

      if (result == null) {
        message = 'Data not found.';
        status = false;
      }

      return {
        success: status,
        result: result,
        message: message
      };
    }
  }
};

module.exports = { typeDef, resolvers };