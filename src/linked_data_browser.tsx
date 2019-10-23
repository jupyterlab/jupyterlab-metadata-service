/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from 'react';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import {
  createConverter,
  resolveDataType,
  DataTypeNoArgs
} from '@jupyterlab/dataregistry';
import {
  IActiveDataset,
  IRegistry,
  reactDataType
} from '@jupyterlab/dataregistry-extension';
import { LinkedData, LinkedDataThunk } from './types';
import {
  LinkedDataRegistry,
  LinkedDataRegistryToken
} from './linked_data_registry';
import { findEntity } from './find_entity';
import { Viewer } from './viewer';

// // Define a conversion data type for compacted JSON-LD (see https://w3c.github.io/json-ld-syntax/#example-162-http-request-with-profile-requesting-a-compacted-document):
// const jsonLDCompactedDataType = new DataTypeNoArgs<Observable<LinkedData>>(
//   "application/ld+json;profile=http://www.w3.org/ns/json-ld#compacted"
// );

// Define a conversion data type for a linked data thunk:
const linkedDataThunkDataType = new DataTypeNoArgs<LinkedDataThunk>(
  'application/x.jupyter.linked-data-thunk'
);

// Define a conversion data type for JSON-LD:
const jsonLDDataType = new DataTypeNoArgs<Observable<LinkedData>>(
  'application/ld+json'
);

/**
 * Activates the plugin.
 *
 * @private
 * @param app - Jupyter front-end application instance
 * @param registry - linked data registry
 * @param dataRegistry - JupyterLab data registry
 * @param activate - activate dataset
 */
function activate(
  app: JupyterFrontEnd,
  registry: LinkedDataRegistry,
  dataRegistry: IRegistry,
  active: IActiveDataset
) {
  // Get linked data from all data types and register them in the graph:
  let linkedData: Array<any> = [];
  dataRegistry.URLs$.pipe(
    switchMap(urls =>
      combineLatest(
        ...([...urls]
          .map(url => {
            const res = jsonLDDataType.getDataset(dataRegistry.getURL(url));
            if (!res) {
              return null;
            }
            return (res as Observable<{ '@id': string }>).pipe(
              map(r => ({
                ...r,
                // Replace by setting base to current URL:
                ...{ '@id': new URL(r['@id'], url).toString() }
              }))
            );
          })
          .filter(e => e !== null)
          .flat() as Array<Observable<LinkedData>>)
      )
    )
  ).subscribe({
    next: value => {
      linkedData = value;
    }
  });

  const provider = {
    get: resolver
  };
  registry.register(provider);

  dataRegistry.addConverter(
    /**
     * Convert json ld to compacted form and resolve base url, so that the @id
     * can be relative to the dataset
     *
     * https://github.com/digitalbazaar/jsonld.js/issues/329#issuecomment-532475466
     */
    // createConverter(
    //   { from: jsonLDDataType, to: jsonLDCompactedDataType },
    //   ({ data, url }) =>
    //     data.pipe(flatMap(doc => compact(doc, {}, { base: url.toString() })))
    // ),
    createConverter(
      { from: resolveDataType, to: linkedDataThunkDataType },
      ({ url }) => registry.get(url)
    ),
    createConverter(
      { from: linkedDataThunkDataType, to: reactDataType },
      ({ url, data }) => ({
        type: 'Linked Data',
        data: (
          <Viewer
            url={url}
            thunk={data}
            onClick={url => active.next(url.toString())}
          />
        )
      })
    )
  );

  /**
   * Returns a thunk to fetch linked data associated with a specified URL.
   *
   * @private
   * @param url - URL
   * @returns a function returning a promise which resolves linked data
   */
  function resolver(url: URL) {
    const result = findEntity(linkedData, url);
    if (!result) {
      return null;
    }
    return async () => result;
  }
}

/**
 * Plugin registration data.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-metadata-service:data-browser',
  activate: activate,
  autoStart: true,
  requires: [LinkedDataRegistryToken, IRegistry, IActiveDataset]
};

/**
 * Exports.
 */
export default extension;
