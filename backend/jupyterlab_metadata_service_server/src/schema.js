const { gql, makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');

// schemas
const Annotation = require('./schemas/annotation');
const CreativeWork = require('./schemas/creative_work');
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
    CreativeWork.typeDef,
    Dataset.typeDef,
    Person.typeDef,
    Organization.typeDef
  ],
  resolvers: merge(
    resolvers,
    Annotation.resolvers,
    CreativeWork.resolvers,
    Dataset.resolvers,
    Person.resolvers,
    Organization.resolvers
  ),
});