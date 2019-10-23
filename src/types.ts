/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

/**
 * Linked data object.
 *
 * @private
 */
type LinkedData = object;

/**
 * Returns a promise which resolves a linked data object.
 *
 * @private
 * @returns a promise which resolves a linked data object
 */
type LinkedDataThunk = () => Promise<LinkedData>;

/**
 * Exports.
 */
export { LinkedData };
export { LinkedDataThunk };
