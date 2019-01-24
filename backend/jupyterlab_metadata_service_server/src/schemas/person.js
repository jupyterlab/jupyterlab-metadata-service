const { gql } = require('apollo-server');

const people = [];
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
`;

const resolvers = {
  Query: {
    people: () => {
      return people.length ? people : [];
    },
    person: (id) => {
      return people[id - 1]
    }
  }
};

module.exports = { typeDef, resolvers };