import { JupyterFrontEnd } from '@jupyterlab/application';

import { IMetadataCommentsService } from '../metadata_iface/comments';

import { IMetadataApolloGraphQlConnection } from '../metadata_concrete/apollo_connection';

class MetadataCommentsService implements IMetadataCommentsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryCommentedItems(): string[] {
    return ['notebook_1', 'whatever_1'];
  }

  queryComments(itemId: string): string[] {
    return ['This is cool.', 'I want more JupyterLab.'];
  }

  createComment(comment: string, itemId: string): void {
    // TODO
  }
}

export function activateMetadataComments(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataCommentsService {
  return new MetadataCommentsService(connection);
}
