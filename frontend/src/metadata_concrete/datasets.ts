import { JupyterLab } from "@jupyterlab/application";

import { IMetadataDatasetsService } from "../metadata_iface/datasets";

import { IMetadataApolloGraphQlConnection } from "../metadata_concrete/apollo_connection";

import gql from "graphql-tag";

class MetadataDatasetsService implements IMetadataDatasetsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryAllDatasets(): object {
    return this.connection.executeQuery(gql`
      query {
        Datasets {
          id
          name
          license
          datePublished
          url
        }
      }
    `);
  }

  createNewDataset(item_id: string): void {
    // TODO
  }
}

export function activateMetadataDatasets(
  app: JupyterLab,
  connection: IMetadataApolloGraphQlConnection
): IMetadataDatasetsService {
  return new MetadataDatasetsService(connection);
}
