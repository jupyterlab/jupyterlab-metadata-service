import { JupyterFrontEnd } from "@jupyterlab/application";

import { IMetadataPeopleService } from "../metadata_iface/people";

import { IMetadataApolloGraphQlConnection } from "../metadata_iface/apollo_connection";

import gql from "graphql-tag";

class MetadataPeopleService implements IMetadataPeopleService {
  connection: IMetadataApolloGraphQlConnection;

  constructor(connection: IMetadataApolloGraphQlConnection) {
    this.connection = connection;
  }

  queryAll(): Promise<{}> {
    return this.connection.query(
      gql`
        query {
          people {
            id
            name
            email
            image
          }
        }
      `,
      {}
    );
  }

  create(name: String, email?: String, image?: String): void {
    this.connection.mutate(
      /* mutation statement */
      gql`
        mutation($name: String!, $email: String, $image: String) {
          addPerson(name: $name, email: $email, image: $image) {
            success
            message
            result {
              id
            }
          }
        }
      `,
      /* variables */
      {
        name: name,
        email: email,
        image: image
      }
    );
  }
}

export function activateMetadataComments(
  app: JupyterFrontEnd,
  connection: IMetadataApolloGraphQlConnection
): IMetadataPeopleService {
  return new MetadataPeopleService(connection);
}
