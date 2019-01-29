const { gql, makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');

// schemas
const Dataset = require('./schemas/dataset');
const Person = require('./schemas/person');
const Organization = require('./schemas/organization');

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Query: { },
  Mutation: { },
};

module.exports = makeExecutableSchema({
  typeDefs: [
    Query,
    Dataset.typeDef,
    Person.typeDef,
    Organization.typeDef
  ],
  resolvers: merge(
    resolvers,
    Dataset.resolvers,
    Person.resolvers,
    Organization.resolvers
  ),
});