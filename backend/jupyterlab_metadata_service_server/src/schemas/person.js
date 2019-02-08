const { gql } = require('apollo-server');

const typeDef = gql`
  type Person {
    id: String!
    name: String
    email: String
    affiliation: Organization
    image: String
  }

  input PersonInput {
    id: String
    name: String
    email: String
    image: String
  }

  type PersonResponse {
    success: Boolean!
    message: String
    result: Person
  }

  extend type Query {
    people: [Person]
    person(id: String!): Person
  }

  extend type Mutation {
    addPerson(
      name: String!
      email: String
      image: String
    ): PersonResponse

    remPerson(id: String!): PersonResponse!
  }
`;

const resolvers = {
  Query: {
    people: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.PersonAPI.fetchall();
    },
    person: (root, args, { dataSources } ) => {
      return dataSources.PersonAPI.getByID(args.id);
    }
  },
  Mutation: {
    addPerson: async (root, args, { dataSources }) => {
      let newData = {
        name: args.name,
        email: args.email,
        image: args.image
      };

      newData = dataSources.PersonAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    },
    remPerson: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.PersonAPI.deleteByID(args.id);

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