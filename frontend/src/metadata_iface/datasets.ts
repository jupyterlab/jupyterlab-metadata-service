import { Token } from "@phosphor/coreutils";

export const IMetadataDatasetsService = new Token<IMetadataDatasetsService>(
  "@jupyterlab/metadata-service:IMetadataDatasetsService"
);

/**
 * The interface for querying, modifying, and creating metadata objects
 * that represent a dataset.
 *
 * TODO: This is NOT the right interface. It's just a placeholder to get going.
 */
export interface IMetadataDatasetsService {
  /**
   * Query for all the datasets.
   */
  queryAllDatasets(): object; // TODO: What type does this return?

  /**
   * Create a new dataset.
   */
  createNewDataset(item_id: string): void;
}
