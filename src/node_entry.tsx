/**
 * @license BSD-3-Clause
 *
 * Copyright (c) 2019 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

import React from "react";
import { InternalURL } from './internal_url';
import { ValueObject } from './value_object';
import { NodeObject } from './node_object';

/**
 * Interface describing a node entry.
 *
 * ## Notes
 *
 * -   The entries of a node object whose keys are not keywords are also called properties of the node object. See [W3C][w3c].
 *
 * [w3c]: https://w3c.github.io/json-ld-syntax/#syntax-tokens-and-keywords
 *
 * @private
 */
interface NodeEntry {
	/**
	 * Keyword.
	 */
	keyword: string;

	/**
	 * Node object.
	 */
	object: object;

	/**
	 * Callback invoked upon a "click" event.
	 *
	 * @param url - URL
	 */
	onClick: (url: URL) => void;
}

/**
 * Renders a node entry.
 *
 * @private
 * @param obj - node entry
 * @returns rendered node entry
 */
function render(obj: NodeEntry) {
	if (obj.keyword === '@id') {
		return (
			<>
				<dt className="jl-metadata-id-keyword"></dt>
				<dd className="jl-metadata-id-field">
					<InternalURL url={(obj.object as any) as string} onClick={obj.onClick} />
				</dd>
			</>
		);
	}
	if (obj.keyword === '@type') {
		return (
			<>
				<dt>type</dt>
				{(Array.isArray(obj.object) ? obj.object : [obj.object]).map(type => (
					<dd key={type}>
						<InternalURL url={type} onClick={obj.onClick} />
					</dd>
				))}
			</>
		);
	}
	return (
		<>
			<dt>{obj.keyword}</dt>
			{(Array.isArray(obj.object) ? obj.object : [obj.object]).map(
				(innerObject, idx) => (
					<dd key={idx}>
						{"@value" in innerObject ? (
							<ValueObject valueObject={innerObject} />
						) : (
							<NodeObject nodeObject={innerObject} onClick={obj.onClick} />
						)}
					</dd>
				)
			)}
		</>
	);
}

/**
 * Exports.
 */
export { render as NodeEntry };
