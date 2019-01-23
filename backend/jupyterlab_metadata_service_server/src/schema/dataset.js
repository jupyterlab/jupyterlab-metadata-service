const { gql } = require('apollo-server');

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
`;

module.exports = typeDef;