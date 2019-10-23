/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from 'react';

/**
 * Interface describing internal URL properties.
 *
 * @private
 */
interface Props {
  /**
   * URL.
   */
  url: string;

  /**
   * Callback invoked upon a "click" event.
   *
   * @param url - URL
   */
  onClick: (url: URL) => void;
}

/**
 * Renders a URL.
 *
 * @private
 * @param props - property values
 * @returns a rendered URL
 */
function InternalURL(props: Props) {
  return (
    <a
      className="jl-metadata-internal-url"
      onClick={() => props.onClick(new URL(props.url))}
    >
      {props.url}
    </a>
  );
}

/**
 * Exports.
 */
export { InternalURL };
