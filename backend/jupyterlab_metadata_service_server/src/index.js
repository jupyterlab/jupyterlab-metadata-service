const { ApolloServer } = require('apollo-server');
// schema
const Schema = require('./schema');

// set up any dataSources our resolvers need
const DatasetAPI = require('./datasources/dataset');
const OrganizationAPI = require('./datasources/organization');
const PersonAPI = require('./datasources/person');

const dataSources = () => ({
  DatasetAPI: new DatasetAPI(),
  OrganizationAPI: new OrganizationAPI(),
  PersonAPI: new PersonAPI(),
});

let args = process.argv.slice(2);
let port = args.length > 0 ? args[0] : 4000;

const server = new ApolloServer({
  schema: Schema,
  dataSources: dataSources
});

server.listen({port: port}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
