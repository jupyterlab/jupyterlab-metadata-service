const { gql } = require('apollo-server');

const typeDef = gql`

  union OrgOrPerson = Organization | Person

  type Dataset {
    # Internal properties
    id: String!
    # Properties from Thing
    name: String!
    # Properties from CreativeWork
    author: Person
    copyrightHolder: Person  # TODO: or Organization
    copyrightYear: Int
    creator: Person  # TODO: or Organization
    dateCreated: String
    dateModified: String
    datePublished: String
    exampleOfWork: CreativeWork
    license: String  # TODO: or CreativeWork
    provider: Organization  # TODO: or Person
    publisher: Organization  # TODO: or Person
    url: String
  }

  type DatasetResponse {
    success: Boolean!
    message: String
    result: Dataset
  }

  extend type Query {
    datasets: [Dataset]
    dataset(id: String!): Dataset
  }

  extend type Mutation {
    addDataset(
      author: PersonInput
      copyrightHolder: PersonInput  # TODO: or OrganizationInput
      copyrightYear: Int
      creator: PersonInput  # TODO: or Organization
      dateCreated: String
      dateModified: String
      datePublished: String
      exampleOfWork: CreativeWorkInput
      license: String  # TODO: or CreativeWorkInput
      name: String!
      provider: OrganizationInput  # TODO: or PersonInput
      publisher: OrganizationInput  # TODO: or PersonInput
      url: String
    ): DatasetResponse!

    remDataset(id: ID!): DatasetResponse!
  }
`;

const resolvers = {
  OrgOrPerson: {
    __resolveType(obj, context, info){
      if(obj.affiliation){
        return 'Person';
      }

      if(obj.legalName){
        return 'Organization';
      }

      return null;
    },
  },
  Query: {
    // TODO: implement pagination
    datasets: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.DatasetAPI.fetchall();
    },
    dataset: (root, args, { dataSources } ) => {
      return dataSources.DatasetAPI.getByID(args.id);
    }
  },
  Mutation: {
    addDataset: async (root, args, { dataSources }) => {

      const author = (
        args.author && args.author.id
          ? dataSources.PersonAPI.getByID(args.author.id)
          : null
      );

      const copyrightHolder = (
        args.copyrightHolder && args.copyrightHolder.id
          ? dataSources.PersonAPI.getByID(args.copyrightHolder.id)
          : null
      );

      const creator = (
        args.creator && args.creator.id
          ? dataSources.PersonAPI.getByID(args.creator.id)
          : null
      );

      const exampleOfWork = (
        args.exampleOfWork && args.exampleOfWork.id
          ? dataSources.CreativeWorkAPI.getByID(args.exampleOfWork.id)
          : null
      );

      const provider = (
        args.provider && args.provider.id
          ? dataSources.OrganizationAPI.getByID(args.provider.id)
          : null
      );

      const publisher = (
        args.publisher && args.publisher.id
          ? dataSources.OrganizationAPI.getByID(args.publisher.id)
          : null
      );

      let newData = {
        author: author,
        copyrightHolder: copyrightHolder,
        copyrightYear: args.copyrightYear,
        creator: creator,
        dateCreated: args.dateCreated,
        dateModified: args.dateModified,
        datePublished: args.datePublished,
        exampleOfWork: exampleOfWork,
        license: args.license,
        name: args.name,
        provider: provider,
        publisher: publisher,
        url: args.url
      };

      newData = dataSources.DatasetAPI.insert(newData);

      return {
        success: true,
        result: newData
      };
    },
    remDataset: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.DatasetAPI.deleteByID(args.id);

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