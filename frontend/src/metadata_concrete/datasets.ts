import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';

import { IMetadataApolloGraphQlConnection } from '../metadata_concrete/apollo_connection';

import gql from 'graphql-tag';

class MetadataDatasetsService implements IMetadataDatasetsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryAllDatasets(): object {
    return this.connection.executeQuery(gql`
      query {
        datasets {
          id
          name
          license
          datePublished
          url
        }
      }
    `);
  }

  createNewDataset(itemId: string): void {
    // TODO
  }
}

export function activateMetadataDatasets(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataDatasetsService {
  return new MetadataDatasetsService(connection);
}
