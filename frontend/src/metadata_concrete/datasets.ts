import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataDatasetsService } from '../metadata_iface/datasets';

import { IMetadataApolloGraphQlConnection } from '../metadata_iface/apollo_connection';

import gql from 'graphql-tag';

class MetadataDatasetsService implements IMetadataDatasetsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryById(id: String): Promise<{}> {
    return this.connection.query(
      gql`
        query($id: String!) {
          dataset(id: $id) {
            id
            author {
              id
              name
            }
            copyrightHolder {
              id
              name
            }
            copyrightYear
            creator {
              id
              name
              affiliation {
                id
                name
              }
            }
            dateCreated
            dateModified
            datePublished
            exampleOfWork {
              id
              name
            }
            license
            provider {
              id
              name
            }
            publisher {
              id
              name
            }
            url
          }
        }
      `,
      { id: id }
    );
  }
}

export function activateMetadataDatasets(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataDatasetsService {
  return new MetadataDatasetsService(connection);
}
