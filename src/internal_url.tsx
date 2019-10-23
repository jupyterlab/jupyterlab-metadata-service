/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from "react";

/**
 * Interface describing a URL object.
 *
 * @private
 */
interface InternalURL {
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
 * @param obj - URL data
 * @returns a rendered URL
 */
function render(obj: InternalURL) {
	return (
		<a
			className="jl-metadata-internal-url"
			onClick={() => obj.onClick(new URL(obj.url))}
		>
			{obj.url}
		</a>
	);
}

/**
 * Exports.
 */
export { render as InternalURL };
