const { ApolloServer } = require('apollo-server');
const Schema = require('./schema');

const DatasetAPI = require('./datasources/dataset');

// set up any dataSources our resolvers need
const dataSources = () => ({
  DatasetAPI: new DatasetAPI(),
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
