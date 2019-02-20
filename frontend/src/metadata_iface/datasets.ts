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
   * Return the one dataset with the given `id`.
   * For now, `id` should be a file URL.
   * In the future, `target` may represent
   * things other than a file.
   */
  queryById(id: String): Promise<{}>;
}
