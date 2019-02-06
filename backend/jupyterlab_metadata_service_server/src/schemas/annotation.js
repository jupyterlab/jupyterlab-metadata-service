const { gql } = require('apollo-server');

const typeDef = gql`

  # type
  type Annotation {
    body: [AnnotationTextualBody]
    context: String # http://www.w3.org/ns/anno.jsonld
    created: String
    creator: Person
    id: String
    label: String
    motivation: String # commenting
    resolved: Boolean
    target: String
    total: Int
    type: String # Annotation
  }

  # type
  type AnnotationTextualBody {
    type: String # TextualBody
    value: String
    creator: Person
    created: String # ISO DateTime
  }

  # type
  type AnnotationResponse {
    success: Boolean!
    message: String
    result: Annotation
  }

  # input
  input AnnotationInput {
    body: AnnotationTextualBodyInput
    context: String # http://www.w3.org/ns/anno.jsonld
    created: String
    creator: PersonInput
    label: String
    motivation: String # commenting
    resolved: Boolean
    target: String
    total: Int
    type: String # Annotation
  }

  # input
  input AnnotationTextualBodyInput {
    value: String
    creator: PersonInput
    created: String
  }

  # query
  extend type Query {
    annotations: [Annotation]
    annotation(target: String!): Annotation
  }

  # mutation
  extend type Mutation {
    addAnnotation(
      motivation: String # commenting
      body: AnnotationTextualBodyInput
      target: String
      creator: PersonInput
    ): AnnotationResponse

    # TODO: WIP
    addAnnotationItem(
      parentAnnotation: AnnotationInput
      motivation: String # commenting
      body: AnnotationTextualBodyInput
      target: String
      creator: PersonInput
    ): AnnotationResponse

    remAnnotation(id: ID!): AnnotationResponse!
  }
`;

const resolvers = {
  Query: {
    annotations: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.AnnotationAPI.fetchall();
    },
    annotation: (root, args, { dataSources } ) => {
      return dataSources.AnnotationAPI.getByField('target', args.target);
    }
  },
  Mutation: {
    addAnnotation: async (root, args, { dataSources }) => {
      let body = args.body;
      let created = (new Date()).toISOString();

      let newData = {
        context: 'http://www.w3.org/ns/anno.jsonld',
        type: 'Annotation',
        motivation: args.motivation || 'commenting',
        target: args.target,
        label: args.label || null,
        created: (new Date()).toISOString(),
        body: [ args.body ]
      };

      newData = dataSources.AnnotationAPI.insert(newData);

      return {
        success: true,
        result: newData
      };
    },
    remAnnotation: (root, args, { dataSources }) => {
      let message = null;
      let status = true;
      const result = dataSources.AnnotationAPI.deleteByID(args.id);

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