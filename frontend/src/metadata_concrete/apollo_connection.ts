import { PageConfig } from '@jupyterlab/coreutils';

import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataApolloGraphQlConnection } from '../metadata_iface/apollo_connection';

import ApolloClient from 'apollo-boost';

class MetadataApolloGraphQlConnection
  implements IMetadataApolloGraphQlConnection {
  client: ApolloClient<{}>;

  constructor() {
    console.log('Starting MetadataApolloGraphQlConnection ...');
    console.log(PageConfig);

    // Construct URL of our proxied service
    let baseUrl = PageConfig.getBaseUrl();
    let serviceUrl = baseUrl + 'metadata/';

    console.log('Instatiating Apollo Client at: ' + serviceUrl);
    this.client = new ApolloClient({
      uri: serviceUrl,
      credentials: 'same-origin'    // See: https://www.apollographql.com/docs/react/recipes/authentication.html
    });
    console.log(this.client);
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
