import { Token } from "@phosphor/coreutils";

export const IMetadataCommentsService = new Token<IMetadataCommentsService>(
  "@jupyterlab/metadata-service:IMetadataCommentsService"
);

/**
 * The interface for querying, modifying, and creating metadata objects
 * that represent a comment.
 *
 * TODO: This is NOT the right interface. It's just a placeholder to get going.
 */
export interface IMetadataCommentsService {
  /**
   * Query for a list of all items that have comments.
   * Returns a list of item identifier strings.
   */
  queryCommentedItems(): string[];

  /**
   * Return the comments on the item with the item identifier of
   * `item_id`.
   */
  queryComments(item_id: string): string[];

  /**
   * Post a new comment (`comment`) to an item (`item_id`).
   */
  createComment(comment: string, item_id: string): void;
}
