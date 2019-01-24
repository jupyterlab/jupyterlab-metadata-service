const { gql } = require('apollo-server');

const data = []
let nextId = 1;

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
    ): DatasetResponse

    remDataset(id: ID!): DatasetResponse!
  }
`;

const resolvers = {
  Query: {
    datasets: () => {
      return data.length ? data : [];
    },
    dataset: (root, args) => {
      return data.length >= args.id ? data[args.id - 1] : null
    }
  },
  Mutation: {
    addDataset: (root, args) => {
      const newData = {
        id: nextId++,
        author: args.author,
        name: args.name,
        license: args.license,
        datePublished: args.datePublished,
        url: args.url
      };

      data.push(newData);

      return {
        success: true,
        result: newData
      };
    },
    remDataset: (root, args) => {
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