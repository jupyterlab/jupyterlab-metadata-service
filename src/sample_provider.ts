/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  LinkedDataRegistry,
  LinkedDataRegistryToken
} from './linked_data_registry';
import { findEntity } from './find_entity';
import defaultGraph from './default_graph';

/**
 * Returns a thunk to fetch linked data associated with a specified URL.
 *
 * @private
 * @param url - URL
 * @returns a function returning a promise which resolves linked data
 */
function resolver(url: URL) {
  const result = findEntity(defaultGraph, url);
  if (!result) {
    return null;
  }
  return async () => result;
}

/**
 * Activates the plugin.
 *
 * @private
 * @param _ - Jupyter front-end application instance
 * @param registry - linked data registry
 */
function activate(app: JupyterFrontEnd, registry: LinkedDataRegistry) {
  const provider = {
    get: resolver
  };
  registry.register(provider);
}

/**
 * Plugin registration data.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-metadata-service:sample-provider',
  activate: activate,
  autoStart: true,
  requires: [LinkedDataRegistryToken]
};

/**
 * Exports.
 */
export default extension;
