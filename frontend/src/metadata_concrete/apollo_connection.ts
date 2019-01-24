import { Token } from "@phosphor/coreutils";

import { JupyterLab } from "@jupyterlab/application";

import ApolloClient from "apollo-boost";

export const IMetadataApolloGraphQlConnection = new Token<
  IMetadataApolloGraphQlConnection
>("@jupyterlab/metadata-service:IMetadataApolloGraphQlConnection");

/**
 * The interface for managing the connection to Apollo GraphQL.
 * Other extensions that need this connection should "require" it
 * via Phospher's dependency injection system.
 */
export interface IMetadataApolloGraphQlConnection {
  executeQuery(query: object): object; // TODO: figure out what type `query` is...
}

class MetadataApolloGraphQlConnection
  implements IMetadataApolloGraphQlConnection {
  client: ApolloClient<{}>;

  constructor() {
    this.client = new ApolloClient({
      uri: "http://localhost:4000" // TODO: parameterize this
    });
  }

  executeQuery(query: object): object {
    return this.client.query({
      query: query
    });
  }
}

export function activateApolloGraphQlConnection(
  app: JupyterLab
): IMetadataApolloGraphQlConnection {
  return new MetadataApolloGraphQlConnection();
}
