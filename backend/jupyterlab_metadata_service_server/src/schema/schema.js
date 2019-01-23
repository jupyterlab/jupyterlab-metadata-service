const { gql, makeExecutableSchema } = require('apollo-server');

const Dataset = require('./dataset');
const Person = require('./person');
const Organization = require('./organization');

const resolvers = require('../resolvers');

const Query = gql`
  type Query {
    Datasets: [Dataset]
    People: [Person]
    Organizations: [Organization]
    dataset(id: Int!): Dataset
    person(id: Int!): Person
    organization(id: Int!): Organization
  }

  type Mutation {
    # if false, booking trips failed -- check errors
    addDataset(
      name: String!
      license: String
      datePublished: String
      url: String
    ): DatasetResponse

    # if false, cancellation failed -- check errors
    remDataset(datasetId: ID!): DatasetResponse!
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [ Query, Dataset, Person, Organization ],
  resolvers: resolvers,
});