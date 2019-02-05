import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';

import { IMetadataApolloGraphQlConnection } from '../metadata_concrete/apollo_connection';

import gql from 'graphql-tag';

class MetadataDatasetsService implements IMetadataDatasetsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryAllDatasets(): Promise<{}> {
    console.log('MetadataDatasetsService.queryAllDatasets');
    return this.connection.query(
      gql`
        query {
          datasets {
            id
            name
          }
        }
      `,
      {}
    );
  }

  createNewDataset(data: object): Promise<{}> {
    console.log('MetadataDatasetsService.queryAllDatasets');
    return this.connection.mutate(
      gql`
        mutation AddDataset($name: String!) {
          addDataset(name: $name) {
            result {
              id
              name
            }
            success
            message
          }
        }
      `,
      data
    );
  }
}

export function activateMetadataDatasets(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataDatasetsService {
  return new MetadataDatasetsService(connection);
}
