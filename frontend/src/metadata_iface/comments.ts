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
    target: string,
    value: string,
    creator: object,
    label?: string
  ): void;

  /**
   * Post a new Comment to an target.
   */
  createComment(threadId: string, value: string, creator: object): void;

  /**
   * Post a new state of to a comment
   */
  setCardValue(itemId: string, cardId: string, key: string, value: any): void;
}
