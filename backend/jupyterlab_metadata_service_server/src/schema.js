const { gql, makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');

// schemas
const Annotation = require('./schemas/annotation');
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
    Annotation.typeDef,
    Dataset.typeDef,
    Person.typeDef,
    Organization.typeDef
  ],
  resolvers: merge(
    resolvers,
    Annotation.resolvers,
    Dataset.resolvers,
    Person.resolvers,
    Organization.resolvers
  ),
});