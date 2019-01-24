const { gql } = require('apollo-server');

const data = [];
let nextId = 1;

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

  extend type Query {
    people: [Person]
    person(id: Int!): Person
  }

  extend type Mutation {
    addPerson(
      name: String!
    ): PersonResponse

    remPerson(id: ID!): PersonResponse!
  }
`;

const resolvers = {
  Query: {
    people: () => {
      return data.length ? data : [];
    },
    person: (root, args) => {
      return data.length >= args.id ? data[args.id - 1] : null
    }
  },
  Mutation: {
    addPerson: (root, args) => {
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
    remPerson: (root, args) => {
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