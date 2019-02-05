import { Token } from "@phosphor/coreutils";

import { JupyterFrontEnd } from "@jupyterlab/application";
import { PageConfig } from "@jupyterlab/coreutils";

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
  query(query: object, variables: object): Promise<{}>; // TODO: figure out what type `query` is...
  mutate(mutation: object, variables: object): Promise<{}>; // TODO: figure out what type `mutation` is...
}

class MetadataApolloGraphQlConnection
  implements IMetadataApolloGraphQlConnection {
  client: ApolloClient<{}>;

  constructor() {
    console.log("Starting MetadataApolloGraphQlConnection ...");

    let baseUrl = PageConfig.getBaseUrl();
    let port = "40000";

    console.log("Starting MetadataApolloGraphQlConnection ...");
    console.log(PageConfig);

    // Construct URL of our proxied service
    let serviceUrl = baseUrl + "metadata/";

    console.log("Getting /metadata at " + serviceUrl);
    window.fetch(serviceUrl).then(response => {
      console.log("Metadata reponse ... ");
      // Check if this is the best approach
      const serviceInternalUrl =
        baseUrl
          .split(":")
          .splice(0, 2)
          .join(":") +
        ":" +
        port +
        "/";

      console.log("Instatiating Apollo Client at " + serviceInternalUrl);
      this.client = new ApolloClient({
        uri: serviceInternalUrl // TODO: parameterize this
      });
      console.log(this.client);
    });
  }

  query(query: object, variables: object): Promise<{}> {
    return this.client.query({
      query: query,
      variables: variables,
      fetchPolicy: 'network-only'
    });
  }

  mutate(mutation: object, variables: object): Promise<{}> {
    return this.client.mutate({ mutation: mutation, variables: variables });
  }
}

export function activateApolloGraphQlConnection(
  app: JupyterFrontEnd
): IMetadataApolloGraphQlConnection {
  return new MetadataApolloGraphQlConnection();
}
