import { Token } from '@phosphor/coreutils';

export const IMetadataDatasetsService = new Token<IMetadataDatasetsService>(
  '@jupyterlab/metadata-service:IMetadataDatasetsService'
);

/**
 * The interface for querying, modifying, and creating metadata objects
 * that represent a dataset.
 */
export interface IMetadataDatasetsService {
  /**
   * Query for all the datasets.
   */
  queryAllDatasets(): Promise<{}>;

  /**
   * Create a new dataset.
   */
  createNewDataset(data: object): Promise<{}>;
}
