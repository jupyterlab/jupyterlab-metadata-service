const { gql } = require('apollo-server');

const typeDef = gql`

  union OrgOrPerson = Organization | Person

  input OrgOrPersonInput {
    person_id: Int
    organization_id: Int
  }

  type Dataset {
    # Internal properties
    id: ID!
    # Properties from Thing
    name: String!
    # Properties from CreativeWork
    author: OrgOrPerson
    license: String
    datePublished: String
    url: String
    publisher: OrgOrPerson
  }

  type DatasetResponse {
    success: Boolean!
    message: String
    result: Dataset
  }

  extend type Query {
    datasets: [Dataset]
    dataset(id: Int!): Dataset
  }

  extend type Mutation {
    addDataset(
      author: OrgOrPersonInput
      name: String!
      license: String
      datePublished: String
      url: String
    ): DatasetResponse!

    remDataset(id: ID!): DatasetResponse!
  }
`;

const resolvers = {
  OrgOrPerson: {
    __resolveType(obj, context, info){
      if(obj.affiliation){
        return 'Person';
      }

      if(obj.legalName){
        return 'Organization';
      }

      return null;
    },
  },
  Query: {
    // TODO: implement pagination
    datasets: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.DatasetAPI.fetchall();
    },
    dataset: (root, args, { dataSources } ) => {
      return dataSources.DatasetAPI.getByID(args.id);
    }
  },
  Mutation: {
    addDataset: async (root, args, { dataSources }) => {
      let newData = {
        author: args.author,
        name: args.name,
        license: args.license,
        datePublished: args.datePublished,
        url: args.url
      };

      newData = dataSources.DatasetAPI.insert(newData);

      return {
        success: true,
        result: newData
      };
    },
    remDataset: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.DatasetAPI.deleteByID(args.id);

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