/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from 'react';

/**
 * Interface describing properties for an object containing a [value object][1].
 *
 * [1]: https://w3c.github.io/json-ld-syntax/#value-objects
 */
interface Props {
  /**
   * Value object.
   */
  valueObject: { '@value': any };
}

/**
 * Renders a [value object][1].
 *
 * [1]: https://w3c.github.io/json-ld-syntax/#value-objects
 *
 * @private
 * @param props - value object property values
 * @returns a rendered value object
 */
function ValueObject(props: ValueObject) {
  const value = props.valueObject['@value'];
  return (
    <span className="jl-metadata-value">
      {typeof value === 'object' ? JSON.stringify(value, null, ' ') : value}
    </span>
  );
}

/**
 * Exports.
 */
export { ValueObject };
