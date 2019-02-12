const { ApolloServer } = require('apollo-server');
// schema
const Schema = require('./schema');

// set up any dataSources our resolvers need
const AnnotationAPI = require('./datasources/annotation')
const DatasetAPI = require('./datasources/dataset');
const OrganizationAPI = require('./datasources/organization');
const PersonAPI = require('./datasources/person');

const dataSources = () => ({
  AnnotationAPI: new AnnotationAPI(),
  DatasetAPI: new DatasetAPI(),
  OrganizationAPI: new OrganizationAPI(),
  PersonAPI: new PersonAPI(),
});

let args = process.argv.slice(2);
let port = args.length > 0 ? args[0] : 4000;

const server = new ApolloServer({
  schema: Schema,
  dataSources: dataSources,
  playground: {
    endpoint: '/metadata',
    settings: {
      'request.credentials': 'same-origin',
      'editor.theme': 'dark'
    }
  }
});

server.listen({
  port: port,
  path: 'metadata',
  host: '0.0.0.0'
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
