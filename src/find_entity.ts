/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import { LinkedData } from './types';

/**
 * Returns a linked data entity associated with a specified URL.
 *
 * @private
 * @param entities - list of entities
 * @param id - URL
 * @returns linked data entity
 */
function findEntity(entities: Array<any>, id: URL): LinkedData | undefined {
  return entities.find(o => o['@id'] === id.toString());
}

/**
 * Exports.
 */
export { findEntity };
