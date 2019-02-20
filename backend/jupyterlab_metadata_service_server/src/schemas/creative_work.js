const { gql } = require('apollo-server');

const typeDef = gql`

  type CreativeWork {
    # Internal properties
    id: String!
    # Properties from Thing
    name: String!
  }

  input CreativeWorkInput {
    id: String!
  }

  type CreativeWorkResponse {
    success: Boolean!
    message: String
    result: CreativeWork
  }

  extend type Query {
    creativeWork(id: String!): CreativeWork
  }

  extend type Mutation {
    addCreativeWork(
      name: String!
    ): CreativeWorkResponse!

    remCreativeWork(id: String!): CreativeWorkResponse!
  }
`;

const resolvers = {
  Query: {
    creativeWork: (root, args, { dataSources } ) => {
      return dataSources.CreativeWorkAPI.getByID(args.id);
    }
  },
  Mutation: {
    addCreativeWork: async (root, args, { dataSources }) => {
      let newData = {
        name: args.name
      };

      newData = dataSources.CreativeWorkAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    },
    remCreativeWork: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.CreativeWorkAPI.deleteByID(args.id);

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