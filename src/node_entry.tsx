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
 * Interface describing node entry properties.
 *
 * ## Notes
 *
 * -   The entries of a node object whose keys are not keywords are also called properties of the node object. See [W3C][w3c].
 *
 * [w3c]: https://w3c.github.io/json-ld-syntax/#syntax-tokens-and-keywords
 *
 * @private
 */
interface Props {
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
 * @param props - node entry property values
 * @returns rendered node entry
 */
function NodeEntry(props: Props) {
    if (props.keyword === '@id') {
        return (
            <>
                <dt className="jl-metadata-id-keyword"></dt>
                <dd className="jl-metadata-id-field">
                    <InternalURL url={(props.object as any) as string} onClick={props.onClick} />
                </dd>
            </>
        );
    }
    if (props.keyword === '@type') {
        return (
            <>
                <dt>type</dt>
                {(Array.isArray(props.object) ? props.object : [props.object]).map(type => (
                    <dd key={type}>
                        <InternalURL url={type} onClick={props.onClick} />
                    </dd>
                ))}
            </>
        );
    }
    return (
        <>
            <dt>{props.keyword}</dt>
            {(Array.isArray(props.object) ? props.object : [props.object]).map(
                (innerObject, idx) => (
                    <dd key={idx}>
                        {"@value" in innerObject ? (
                            <ValueObject valueObject={innerObject} />
                        ) : (
                            <NodeObject nodeObject={innerObject} onClick={props.onClick} />
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
export { NodeEntry };
