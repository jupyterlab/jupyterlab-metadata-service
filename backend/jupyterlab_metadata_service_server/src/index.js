const { ApolloServer } = require('apollo-server');
const Schema = require('./schema/schema');

let args = process.argv.slice(2);
let port = args.length > 0 ? args[0] : 4000;

const server = new ApolloServer({
  schema: Schema
});

server.listen({port: port}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
