const { gql } = require('apollo-server');

const typeDef = gql`

  # type
  type Annotation {
    body: [AnnotationTextualBody]
    context: String # http://www.w3.org/ns/anno.jsonld
    created: String # ISO DateTime
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
    created: String # ISO DateTime
    creator: Person
    type: String # TextualBody
    value: String
  }

  # type
  type AnnotationResponse {
    success: Boolean!
    message: String
    result: Annotation
  }

  type AnnotationTextualBodyResponse {
    success: Boolean!
    message: String
    result: AnnotationTextualBody
  }

  # input
  input AnnotationInput {
    id: String
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
    annotationsByTarget(target: String!): [Annotation]!
  }

  # mutation
  extend type Mutation {
    # add annotation
    addAnnotation(
      body: AnnotationTextualBodyInput
      creator: PersonInput
      label: String
      motivation: String
      target: String
      resolved: Boolean = false
    ): AnnotationResponse

    # add annotation item
    addAnnotationItem(
      annotation: AnnotationInput
      motivation: String = "commenting"
      body: AnnotationTextualBodyInput
    ): AnnotationTextualBodyResponse
    
    # update resolved state
    updateAnnotationResolve(
      annotation: AnnotationInput
    ): AnnotationResponse

    # remove
    remAnnotation(id: ID!): AnnotationResponse!
  }
`;

const resolvers = {
  Query: {
    annotations: async (_, { pageSize = 20, after }, { dataSources }) => {
      return dataSources.AnnotationAPI.fetchall();
    },
    annotationsByTarget: (root, args, { dataSources } ) => {
      return dataSources.AnnotationAPI.filterByField('target', args.target);
    }
  },
  Mutation: {
    /**
     *
     */
    addAnnotation: async (root, args, { dataSources }) => {
      let body = args.body;
      let created = (new Date()).toISOString();

      body['created'] = created;
      body['creator'] = dataSources.PersonAPI.getByID(args.creator['id']);

      let newData = {
        body: [ args.body ],
        context: 'http://www.w3.org/ns/anno.jsonld',
        created: created,
        label: args.label || null,
        motivation: args.motivation || 'commenting',
        resolved: false,
        target: args.target,
        type: 'Annotation'
      };

      newData = dataSources.AnnotationAPI.insert(newData);

      return {
        success: true,
        message: null,
        result: newData
      };
    },
    /**
     * 
     */
    updateAnnotationResolve: async (root, args, { dataSources }) => {

      newData = dataSources.AnnotationAPI.updateResolve(args.annotation);

      return {
        success: true,
        message: null,
        result: newData
      };
    },
    /**
     *
     */
    addAnnotationItem: async (root, args, { dataSources }) => {
      let newData = args.body;
      let created = (new Date()).toISOString();

      newData['created'] = created;
      newData['creator'] = dataSources.PersonAPI.getByID(newData['creator']['id']);
      newData['motivation'] = args.motivation || 'commenting';

      newData = dataSources.AnnotationAPI.update(
        args.annotation,
        newData,
        args.resolved || false
      );

      return {
        message: null,
        result: newData,
        success: true
      };
    },
    /**
     *
     */
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