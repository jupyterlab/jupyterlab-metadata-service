import { Token } from "@phosphor/coreutils";

export const IMetadataCommentsService = new Token<IMetadataCommentsService>(
  "@jupyterlab/metadata-service:IMetadataCommentsService"
);

/**
 * The interface for querying, modifying, and creating metadata objects
 * that represent a comment.
 */
export interface IMetadataCommentsService {
  /**
   * Return all comment threads on a target.
   * For now, `target` should be a file URL.
   * In the future, `target` may represent
   * things other than a file.
   */
  queryAllByTarget(target: String): Promise<{}>;

  /**
   * Create a new thread for a target.
   */
  createThread(
    target: String,
    value: String,
    creator: Object,
    label?: String
  ): void;

  /**
   * Create a new comment in a thread.
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
