/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from 'react';
import { NodeEntry } from './node_entry';

/**
 * Interface describing [node object][1] properties.
 *
 * [1]:https://w3c.github.io/json-ld-syntax/#node-objects
 */
interface IProps {
  /**
   * [Node object][1].
   *
   * [1]:https://w3c.github.io/json-ld-syntax/#node-objects
   */
  nodeObject: object;

  /**
   * Callback invoked upon a "click" event.
   *
   * @param url - URL
   */
  onClick: (url: URL) => void;
}

/**
 * Renders a node object.
 *
 * @private
 * @param props - node object property values
 * @returns rendered node object
 */
function NodeObject(props: IProps) {
  const entries = Object.entries(props.nodeObject);
  if (entries.length === 0) {
    return <div>No properties.</div>;
  }
  return (
    <dl className="jl-metadata-node">
      {entries.map(([keyword, object]) => (
        <NodeEntry
          key={keyword}
          {...{ keyword, object, onClick: props.onClick }}
        />
      ))}
    </dl>
  );
}

/**
 * Exports.
 */
export { NodeObject };
