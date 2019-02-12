import { Token } from "@phosphor/coreutils";

export const IMetadataPeopleService = new Token<IMetadataPeopleService>(
  "@jupyterlab/metadata-service:IMetadataPeopleService"
);

/**
 * The interface for querying, modifying, and creating metadata objects
 * that represent a person.
 */
export interface IMetadataPeopleService {
  /**
   * Return all people registered
   */
  queryAll(): Promise<{}>;

  /**
   * Create a new thread for a target.
   */
  create(name: String, email?: String, image?: String): void;
}
