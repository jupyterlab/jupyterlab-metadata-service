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
   * Return the comments on a target with the target identifier of
   * `target`.
   */
  queryAllByTarget(target: String): Promise<{}>;

  /**
   * Post a new thread to an target.
   */
  createThread(
    target: String,
    value: String,
    creator: Object,
    label?: String
  ): void;

  /**
   * Post a new Comment to an target.
   */
  createComment(
    threadId: String,
    value: String,
    creator: Object,
    resolved: Boolean
  ): void;

  /**
   * Post a new state of to a comment
   */
  setCardValue(itemId: string, cardId: string, key: string, value: any): void;
}
