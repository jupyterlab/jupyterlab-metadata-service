import { JupyterFrontEnd } from "@jupyterlab/application";

import { IMetadataCommentsService } from "../metadata_iface/comments";

import { IMetadataApolloGraphQlConnection } from '../metadata_iface/apollo_connection';

import gql from "graphql-tag";

class MetadataCommentsService implements IMetadataCommentsService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryAllByTarget(target: String): Promise<{}> {
    return this.connection.query(
      gql`
        query($target: String) {
          annotation(target: $target) {
            id
            target
            context
            label
            total
            body {
              value
              created
              creator {
                id
                name
                image
              }
            }
          }
        }
      `,
      { target: target }
    );
  }

  createThread(
    target: string,
    value: string,
    creator: object,
    label?: string
  ): void {
    this.connection.mutate(
      /* mutation statement */
      gql`
        mutation($body: AnnotationTextualBodyInput, $target: String) {
          addAnnotation(body: $body, target: $target) {
            success
            message
            result {
              id
              target
              context
              label
              total
              body {
                value
                created
                creator {
                  id
                  name
                  image
                }
              }
            }
          }
        }
      `,
      /* variables */
      {
        target: target,
        body: { value: value, creator: creator }
      }
    );
  }

  createComment(threadId: string, value: string, creator: object) {
    return null;  // TODO
  }

  setCardValue(itemId: string, cardId: string, key: string, value: any): void {
    // testData[itemId][cardId]['startComment'][key] = value;
    // TODO
  }
}

export function activateMetadataComments(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataCommentsService {
  return new MetadataCommentsService(connection);
}
