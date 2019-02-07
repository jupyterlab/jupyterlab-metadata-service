import { Token } from '@phosphor/coreutils';

export const IMetadataApolloGraphQlConnection = new Token<
  IMetadataApolloGraphQlConnection
>('@jupyterlab/metadata-service:IMetadataApolloGraphQlConnection');

/**
 * The interface for managing the connection to Apollo GraphQL.
 * Other extensions that need this connection should "require" it
 * via Phospher's dependency injection system.
 *
 * One connection will be made to Apollo. This iterface merely
 * exposes the two ways to use Apollo (query and mutate).
 */
export interface IMetadataApolloGraphQlConnection {
  /**
   * Execute a query on the Apollo GraphQL server, return the results
   * as an object.
   */
  query(query: object, variables: object): Promise<{}>;

  /**
   * Execute a mutation on the Apollo GraphQL server, return the results
   * as an object.
   */
  mutate(mutation: object, variables: object): Promise<{}>;
}
