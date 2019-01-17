
const { gql } = require('apollo-server');

const typeDefs = gql`

union OrgPerson = Organization | Person

type Query {
  Datasets: [Dataset]
  dataset(id: ID!): Dataset
}

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

type Organization {
  id: ID!
  name: String
}

type Person {
  id: ID!
  name: String
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

type DatasetResponse {
  success: Boolean!
  message: String
  dataset: Dataset
}

`

module.exports = typeDefs;
