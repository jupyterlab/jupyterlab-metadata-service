import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

var client: ApolloClient<{}>;

export const openConnection = function() {
  client = new ApolloClient({
    uri: "http://localhost:4000"
  });
};

export const getDatasets = function() {
  return client.query({
    query: gql`
      query {
        Datasets {
          id
          name
          license
          datePublished
          url
        }
      }
    `
  });
};
