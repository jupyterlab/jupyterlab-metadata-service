const { ApolloServer } = require('apollo-server');
const Schema = require('./schema/schema');


const server = new ApolloServer({
  schema: Schema
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
