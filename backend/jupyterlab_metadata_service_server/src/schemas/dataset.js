const { gql } = require('apollo-server');

const datasets = []
let nextId = 1;

const typeDef = gql`

  union OrgPerson = Organization | Person

  type Dataset {
    # Internal properties
    id: ID!
    # Properties from Thing
    name: String!
    # Properties from CreativeWork
    author: OrgPerson
    license: String
    datePublished: String
    url: String
    publisher: OrgPerson
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
      name: String!
      license: String
      datePublished: String
      url: String
    ): DatasetResponse

    remDataset(id: ID!): DatasetResponse!
  }
`;

const resolvers = {
  Query: {
    datasets: () => {
      return datasets.length ? datasets : [];
    },
    dataset: (root, args) => {
      return datasets.length <= id ? datasets[args.id] : null
    }
  },
  Mutation: {
    addDataset: (root, args) => {
      const newDataset = {
        id: nextId++,
        name: args.name,
        license: args.license,
        datePublished: args.datePublished,
        url: args.url
      };

      datasets.push(newDataset);

      return {
        success: true,
        result: newDataset
      };
    },
    remDataset: (root, args) => {
      let oldDataset = null;
      let message = null;
      let status = true;

      if (datasets.length <= args.id) {
        oldDataset = datasets.pop(args.id - 1);
      } else {
        message = 'Dataset not found.';
        status = false;
      }

      return {
        success: status,
        result: newDataset,
        message: message
      };

    }
  }
};

module.exports = { typeDef, resolvers };